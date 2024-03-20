const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    name:String,
    price:String,
    quantity:String,
    imgpath:String
})
const ProductsModel = mongoose.model("Products",ProductsSchema)
module.exports=ProductsModel


