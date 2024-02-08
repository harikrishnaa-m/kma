const mongoose = require("mongoose");

const ESGSchema = new mongoose.Schema({
    organization: {type:String,required:true},
    address: {type:String},
    contactPerson:{type:String},
    email: {type:String},
    phone:{type:Number},
    website:{type:String},
    head:{type:String},
    orgType:{type:String},
    stockExchange:{type:String},
    paymentDetails:{type:{
        mode:{type:String},
        ss:{type:String},
        transactionId:{type:String},
    }},
    attachments:{type:[]}    
    
},{timestamps:true})

const ESG = mongoose.model("ESG", ESGSchema);

module.exports = ESG;