const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
    organization: { type: String, required: true },
    address: { type: String },
    contactPerson: { type: String },
    email: { type: String, unique: true },
    phone: { type: Number, unique: true },
    website: { type: String },
    GSTNumber: { type: String },
    head: { type: String },
    legalStatus: { type: String },
    csrNumber: { type: String },
    paymentDetails: {
        mode: { type: String },
        amount: { type: String },
        amountWithGst: { type: String },
        ss: { type: String },
        transactionId: { type: String },
        muid: { type: String },
    },
    attachments: { type: [] },
    formName: { type: String, default: "NGO" }

}, { timestamps: true })

const NGO = mongoose.model("NGO", NGOSchema);

module.exports = NGO;