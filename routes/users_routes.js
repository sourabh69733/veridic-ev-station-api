const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const Orders = mongoose.model("Orders");
const utils = require("../lib/utils");
const { param } = require("./admin_routes");
const AdminSchema = mongoose.model("AdminSchema");
const ProductSchema = mongoose.model("ProductSchema");


// Error message is common 
const error_message =
  "There is problem with user id, please try again or we will let you know problem and solve it immedialty ";
// Regrister route 
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

// 

// Login router
router.post("/login", utils.authMiddleware, function (req, res, next) {
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
        msg: "Successflly login user " + req.body.username,
        user: user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    }
  });
});

/**
 * Logout route, only authenticated user can logout
 */
router.get("/logout", utils.authMiddleware, (req, res, next) => {
  req.logout();
});


/**
 * Browse all available products from all sellers, login do not require 
 */
router.get("/browse-products", function (req, res, next) {
  
  ProductSchema.find()
    .then((item) => {
      return res.json({
        success:true,
        products: item.products,
      });
    })
    .catch((err) => res.json({ msg: "ops! something went wrong " + err }));
});

router.post(
  "/order-product/:id",
  utils.authMiddleware,
  function (req, res, next) {
    const user_id = req.params.id;
    const product_id = req.body.product_id;
    const seller_id = req.body.seller_id;

    ProductSchema.find().then((item) => {
      if (item.seller_id === seller_id && item._id === product_id) {
        User.findById(user_id).then((item) => {
          item.orders.push({
            product_id: product_id,
            seller_id: seller_id,
          });

          item
            .save()
            .then(() =>
              res.json({ msg: "Order placed Successfully, Thanks for order" })
            )
            .catch((err) =>
              res.json({
                msg:
                  error_message +
                  err,
              })
            );
        })
        .catch((err) => res.json({msg: "user " +error_message+err}))
        AdminSchema.findById(seller_id)
          .then((admin) => {
            admin.orders.push({
              user_id: user_id,
              product_id: product_id,
            });

            admin
              .save()
              .then(() =>
                res.json({
                  msg: "Order placed Successfully, Thanks for order",
                })
              )
              .catch((err) =>
                res.json({
                  msg: error_message + err,
                })
              );
          })
          .catch((err) => res.json({ msg: "admin "+error_message + err }));
        return res.json({
          success: true,
          user_id:user_id,
          seller_id:seller_id,
          msg: "product added sucessfully",
        });
      }
    });
  }
);


router.get("/view-orders/:id", utils.authMiddleware, function (req, res, next) {
  const user_id = req.params.id;
  User.findById(user_id)
    .then((orders) => {
      res.json({
        msg: "Successfully fetched user orders",
        orders: orders,
      });
    })
    .catch((err) => {
      res.json({
        msg: "failed, there is no user exist with pass ID " + err,
      });
    });
});

module.exports = router;
/**
 * product_id  --product schema, seller_id --admin schema, user_id ---user product schema
 */