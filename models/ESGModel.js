const mongoose = require("mongoose");

const ESGSchema = new mongoose.Schema({
    organization: { type: String, required: true },
    address: { type: String },
    contactPerson: { type: String },
    email: { type: String, },
    phone: { type: Number},
    website: { type: String },
    head: { type: String },
    orgType: { type: String },
    GSTNumber: { type: String },
    stockExchange: { type: String },
    kma_member: { type: Boolean, default: false },
    paymentDetails: {
        mode: { type: String },
        amount: { type: String },
        amountWithGst: { type: String },
        ss: { type: String },
        transactionId: { type: String },
        muid: { type: String },
    },
    attachments: { type: [] },
    formName: { type: String, default: "ESG" }

}, { timestamps: true })

const ESG = mongoose.model("ESG", ESGSchema);

module.exports = ESG;