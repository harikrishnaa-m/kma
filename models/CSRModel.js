const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema({
    organizationProfile: {
        name: { type: String, required: true },
        address: { type: String },
        contactPerson: {
            name: { type: String, required: true },
            mobile: { type: String },
            email: { type: String },
        },
        website: { type: String },
        headOfOrganization: { type: String },

    },
    

    projectDetails: {
        name: { type: String, required: true },
        awardCategory: { type: String, required: true },
        organizationType: { type: String, enum: ["NGO", "Company", "Others"], required: true },
        annualCSRBudget: { type: String },
        gstNumber: { type: String },
    },

    financialDetails: {
        applicationAmountWithGST: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentReceipt: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
    },

    csrProjectOverview: { type: String },

    impactMetrics: [String],

    innovationAndScalability: {
        innovationDescription: { type: String, required: true },
        scalabilityPotential: { type: String, required: true },
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
    }


}, { timestamps: true })

const CSR = mongoose.model("CSR", CSRSchema);

module.exports = CSR;