const mongoose = require('mongoose')

const SofasSchema = new mongoose.Schema({
    name:String,
    price:String,
    quantity:String,
    imgpath:String
})
const SofasModel = mongoose.model("Sofas",SofasSchema)
module.exports=SofasModel


