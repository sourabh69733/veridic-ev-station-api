const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const Orders = mongoose.model("Orders");
const AdminSchema= mongoose.model("AdminSchema");
// const passport = require("passport");
const utils = require("../lib/utils");


router.post("/add/products", function (req, res, next) {
    const name= req.body.name;
    const price = req.body.price;
    const links= req.body.links;
    const otherData = req.body.data;

    const product = new AdminSchema({
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
            msg:"Success Prodcut Added!",
            products : products
        })
    })
    .catch(err => res.json({msg:"ops something went wrong "+err}));

});

module.exports = router;
