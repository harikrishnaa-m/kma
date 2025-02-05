const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema({
    formName: { type: String, default: "CSR", immutable: true },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    keyCriteria: { type: String },

    projectTheme: { type: String, enum: ["Education", "Health", "Social Inclusion", "Environment"], required: true },

    organizationProfile: {
        name: { type: String, required: true },

        corporateOfficeLocation: { type: String },
        description: { type: String },
        ownership: { type: String },
        yearOfEstablishment: { type: Number },
        annualTurnoverFY2023_24: { type: String },
        totalEmployees: { type: Number },
        reportingSystem: { type: String },
        certifications: { type: String },
    },

    csrPolicyAndPractice: {
        salientFeatures: { type: String },
        csrCommittee: { type: String },
        fundsAllocated: { type: String },
        projectsFY2023_24: { type: String },
        awarenessPrograms: { type: String },
        auditSystem: { type: String },
        csrReport: { type: String },
        accolades: { type: String },
    },

    attachments: {

        csrProjectReport: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },

        reportingSystemReport: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
        certificates: [{
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        }],
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