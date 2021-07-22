const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    account:String,

    products:{
        name:String,
        price:Number,
        links: String,
        otherData:Array,
        required: false,
    },
    
    orders: {
        type: String,
        required: false,
    },
});

mongoose.model("Orders", OrderSchema);


/**
 * account -- {
 *  name - 
 *  salt -- , hash -- 
 *  
 * }
 */