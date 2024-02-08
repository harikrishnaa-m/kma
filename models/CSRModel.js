const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema({
    organization: {type:String,required:true},
    address: {type:String},
    contactPerson:{type:String},
    email: {type:String},
    phone:{type:Number},
    website:{type:String},
    head:{type:String},
    orgType:{type:String},
    orgCategory:{type:String},
    awardCategory:{type:String},
    paymentDetails:{type:{
        mode:{type:String},
        ss:{type:String},
        transactionId:{type:String},
    }},
    attachments:{type:[]}
    
},{timestamps:true})

const CSR = mongoose.model("CSR", CSRSchema);

module.exports = CSR;