const mongoose = require('mongoose')

const StudytblSchema = new mongoose.Schema({
    name:String,
    price:String,
    quantity:String,
    imgpath:String
})
const StudyTableModel = mongoose.model("Studytables",StudytblSchema)
module.exports=StudyTableModel


