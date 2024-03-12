const mongoose = require('mongoose')

const FurnitureSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const FurnitureModel = mongoose.model("RegisterData",FurnitureSchema)
module.exports=FurnitureModel