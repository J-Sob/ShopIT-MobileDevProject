const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title : {
        type:String,
    },
    desc : {
        type:String
    },
    img : {
        type:String,
    },
    categories: {
        type:Array,
    },
    size : {
        type:Array,
    },
    color: {
        type:Array,
    },
    price: {
        type:Number,
    },
    inStock: {
        type:Boolean
    },
    quantity:{
        type:Number,
    },
    comment : [

        {
            cmnt : {
                type:String,
            },
            UserId : {
                type : mongoose.Types.ObjectId
            },
            date : {
                type : Date.now()
            }
        }
        
    ],
},
{timestamps:true}
);

module.exports = mongoose.model("Product",ProductSchema);