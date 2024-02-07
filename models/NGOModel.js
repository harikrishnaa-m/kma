const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
    organization: {type:String,required:true},
    address: {type:String},
    contactPerson:{type:String},
    email: {type:String},
    phone: {type:String},
    website:{type:String},
    head:{type:String},
    legalStatus:{type:String},
    csrNumber:{type:String},
    paymentDetails:{type:{
        mode:{type:String},
        ss:{type:String},
        transactionId:{type:String},
    }},
    attachments:{type:[]}
    
},{timestamps:true})

const NGO = mongoose.model("NGO", NGOSchema);

module.exports = NGO;