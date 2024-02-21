const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema({
    organization: { type: String, required: true },
    address: { type: String },
    contactPerson: { type: String },
    email: { type: String, unique: true },
    phone: { type: Number, unique: true },
    website: { type: String },
    head: { type: String },
    orgType: { type: String },
    orgCategory: { type: String },
    awardCategory: { type: String },
    GSTNumber: { type: String },
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
    formName: { type: String, default: "CSR" }

}, { timestamps: true })

const CSR = mongoose.model("CSR", CSRSchema);

module.exports = CSR;