const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:String,
    price:String,
    quantity:String,
    imgpath:String
})
const ProductDataModel = mongoose.model("OrderData",ProductSchema)
module.exports=ProductDataModel


