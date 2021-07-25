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
please check it or may be internal problem or check other admin router working or not, please raise issues, error is `;



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
      return res.status(200).json({
        msg: "Success Prodcut Added!",
        products: products,
      });
    })
    .catch((err) => next(error_message+err));

});

router.get("/view-products/:id", utils.authMiddleware, function (req,res, next) {

  ProductSchema.findById(req.params.id)
    .then((product) =>
      res.status(200).json({
        product_id: product.map((item) => item._id),
        products: product.map((item) => item.products),
      })
    )
    .catch((err) => next(err));

});


router.get("/view-orders/:id", utils.authMiddleware, function (req, res, next) {

  const seller_id = req.params.id; // It is admin id, we get it from after login

  AdminSchema.findById(seller_id)
    .then((orders) => {
      return res.json({
        success: true,
        seller_id: seller_id,
        products: orders.orders,
        adminname:orders.adminname,
      });
    })
    .catch((err) => next(error_message + err));
})
module.exports = router;

/**
  "name":"tea",
 "price":12,
 "links:":null,
 "data":["it first product added to from admin sourabh admin1"]
 */