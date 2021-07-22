const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const Orders = mongoose.model("Orders");
const utils = require("../lib/utils");
const { param } = require("./admin_router");
const AdminSchema = mongoose.model("AdminSchema");
const ProductSchema = mongoose.model("ProductSchema");



// Login router
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(401).json({ success: false, msg: "could not get user" });
      res.redirect("./register");
    }
    const isValid = utils.validPassword(
      req.body.password,
      user.hash,
      user.salt
    );

    if (isValid) {
      const tokenObject = utils.issueJWT(user);

      res.status(200).json({
        success: true,
        msg:"Successflly login user "+req.body.username,
        user: user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    }
  });
  // res.redirect("/protected");
});

// TODO
router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user) => {
      const id = user._id;
      const jwt = utils.issueJWT(user);

      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
      console.log(user);
    })
    .catch((err) => next(err));
});

// Logout router
router.get("/logout", utils.authMiddleware, (req, res, next) => {
  req.logout();
  // res.redirect("/login")
});


router.get("/browse-products", function (req, res, next) {
  
  ProductSchema.find()
    .then((item) => {
      return res.json({
        products: item.products,
      });
    })
    .catch((err) => res.json({ msg: "ops! something went wrong " + err }));
});

router.post("/order-product", function (req, res, next) {
  const  product_id = req.body.product_id;
  const seller_id = req.body.seller_id;

  ProductSchema.find()
  .then((item) => {
    if (item.seller_id === seller_id && item.product_id === product_id) {
      User.findById(req.params.match.id)
      .then((item) => {
        item.orders.push({
          product_id:product_id, 
          seller_id:seller_id,
        })
        return item;
      })
      return res.json({
        success:true,
        msg:"product added sucessfully"
      })
    }
  })
});

router.get("/view-orders/:id", function (req, res, next) {
  const user_id = req.params.id;
  User.findById(user_id)
    .then((orders) =>{
      res.json({
        "msg":"Successfully fetched user orders", 
        orders:orders,
      })
    })
    .catch((err) => {
      res.json({
        msg:"failed, there is no user exist with pass ID "+err
      })
    });
    
})
module.exports = router;

/**
 * id of that product
 * id of seller
 * 
 */