const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema({
    formName: { type: String, default: "CSR", immutable: true },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    organizationProfile: {
        name: { type: String, required: true },
        address: { type: String },
        contactPerson: { type: String },
        mobile: { type: String },
        email: { type: String },
        website: { type: String },
        head: { type: String },
    },

    projectDetails: {
        name: { type: String },
        awardCategory: { type: String },
        organizationType: { type: String, enum: ["NGO", "Company", "Others"] },
        annualCSRBudget: { type: String },
        gstNumber: { type: String },
    },

    csrProjectOverview: { type: String },

    impactMetrics: [String],

    innovationAndScalability: {
        innovationDescription: { type: String },
        scalabilityPotential: { type: String },
    },

    attachments: {
        organizationProfile: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
        csrPolicyAndPractice: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
        csrProjectReport: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
    },

    paymentDetails: {
        mode: { type: String },
        amount: { type: Number },
        amountWithGst: { type: Number },
        transactionId: { type: String },
        muid: { type: String },
        receipt: {
            name: { type: String },
            key: { type: String },
            location: { type: String },
        },
    },


}, { timestamps: true })

const CSR = mongoose.model("CSR", CSRSchema);

module.exports = CSR;