const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const utils = require("../lib/utils");
const AdminSchema = mongoose.model("AdminSchema");
const ProductSchema = mongoose.model("ProductSchema");

const error_message = `There may be problems with bearer token or user id or password or username. 
  It could be due to server, please try again and email us. `;


/**
* @params no authentication required
 * Browse all available products from all sellers, login do not require 
 */
router.get("/browse-products", function (req, res, next) {
  
  ProductSchema.find()
    .then((item) => {
      return res.json({
        success:true,
        products: item,
      });
    })
    .catch((err) => res.json({ msg: "ops! something went wrong " + err }));
});
// 60fc4b331f58ff12282add03
/**
 * authorization required
 * @param product id, seller id and user id
 * @returns made order for user
 */
router.post(
  "/order-product/:id",
  utils.authMiddleware,
  function (req, res, next) {
    const user_id = req.params.id;
    const product_id = req.body.product_id;
    const seller_id = req.body.seller_id;

        User.findById(user_id)
          .then((item) => {
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
                  msg: error_message + err,
                })
              );
          })
          .catch((err) => next(error_message + err ));
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
          .catch((err) => next(error_message + err ));
        return res.json({
          success: true,
          user_id: user_id,
          seller_id: seller_id,
          msg: "product added sucessfully",
        });
      }
);


/**
 * only autheticated user allowed
 * @params user id
 * @returns orders made by user
 * 
 */
router.get("/view-orders/:id", utils.authMiddleware, function (req, res, next) {

  const user_id = req.params.id;
  User.findById(user_id)
    .then((user) => {
      if(!user){
        return res.json({
          success:false,
          msg:"user id is invalid"
        })
      }
      return res.json({
        msg: "Successfully fetched user orders",
        orders: user.orders,
      });
    })
    .catch((err) => {
      return res.json({
        msg: "failed, there is no user exist with pass ID " + err,
      });
    });
});

module.exports = router;
/**
 * product_id  --product schema, seller_id --admin schema, user_id ---user product schema
 */