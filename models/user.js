const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  orders: {
    type: Array,
    required: false,
  },
});

const AdminSchema = new mongoose.Schema({
  account: {
    type: String,
    required: false,
  },
  seller_id: String,
  
});

const ProductSchema = new mongoose.Schema({
  seller_id: String,
  products: {
    name: String,
    price: Number,
    links: String,
    data: Array,
    required: false,
  },

});
mongoose.model("User", UserSchema);
mongoose.model("AdminSchema", AdminSchema);
mongoose.model("ProductSchema", ProductSchema);