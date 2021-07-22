const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const AdminSchema= mongoose.model("AdminSchema");
const ProductSchema = mongoose.model("ProductSchema");
const utils = require("../lib/utils");

/**
 * It has Register route, login route, logout route.
 * Add products api, view products api
 * see  README.md for more details
 */

const error_message = `There is problem with seller id, 
please check it or may be internal problem or check other admin router working or not, report to sourabhsahu69733@gmail.com, error is `;

// Regrister route 
router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new AdminSchema({
    adminname: req.body.adminname,
    hash: hash,
    salt: salt,
    isAdmin: true,
  });

  newUser
    .save()
    .then((user) => {
      const id = user._id;
      const jwt = utils.issueJWT(user);

      res.json({
        success: true,
        admin: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
      console.log(user);
    })
    .catch((err) => next(err));
});

// 

// Login router
router.post("/login", utils.authMiddleware, function (req, res, next) {
  AdminSchema.findOne({ adminname: req.body.adminname }).then((user) => {
    if (!user) {
      console.log("error 1")
      return res.status(401).json({ success: false, msg: "could not get user" });
      // res.redirect("./register");
    }
    console.log("error 2", req.body.password, user.hash, user.salt);

    const isValid = utils.validPassword(
      req.body.password,
      user.hash,
      user.salt
    );

    if (isValid) {
      const tokenObject = utils.issueJWT(user);
      console.log("error 3");

      res.status(200).json({
        success: true,
        msg: "Successflly login admin " + req.body.adminname,
        adminname: user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    }
  })
  .catch((err) => err)
});

/**
 * Logout route, only authenticated user can logout
 */
router.get("/logout", utils.authMiddleware, (req, res, next) => {
  req.logout();
});


// only autheticated user can add products, send to products data with seller id 
router.post("/add/products/:id", utils.authMiddleware, function (req, res, next) {

  const seller_id = req.params.id;    // It is admin id, we get it from after login
  const name = req.body.name;
  const price = req.body.price;
  const links = req.body.links;
  const otherData = req.body.data;

  const product = new ProductSchema({
    seller_id:seller_id,
    products: {
      name: name,
      price: price,
      links: links,
      data: otherData,
    },
  });

  product
    .save()
    .then((products) => {
      res.json({
        msg: "Success Prodcut Added!",
        products: products,
      });
    })
    .catch((err) => res.json({ msg: error_message + err }));

});

router.get("/view-orders/:id", utils.authMiddleware, function (req, res, next) {

  const seller_id = req.params.id; // It is admin id, we get it from after login

  AdminSchema.find()
    .then((orders) => {
      res.json({
        success: true,
        seller_id: seller_id,
        products: orders,
      });
    })
    .catch((err) => res.json({ msg: error_message + err }));
})
module.exports = router;

