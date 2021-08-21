const mongoose=require('mongoose');

const contactSchema= new mongoose.Schema({
    name:String,
    phone:String,
    address:String,
    notes:String
})

module.exports=mongoose.model("Contact",contactSchema);
