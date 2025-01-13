const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema({
    formName: { type: String, default: "CSR", immutable: true },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    // SDGsAlignment:{type: String},
    // csrProjectOverview: { type: String },
    // impactMetrics:  { type: String},
    // innovationAndScalability: { type: String },

    organizationProfile: {
        name: { type: String, required: true },
        // address: { type: String },
        // contactPerson: { type: String },
        // mobile: { type: String },
        // email: { type: String },
        // website: { type: String },
        // head: { type: String },


        corporateOfficeLocation: { type: String },
        description: { type: String },
        ownership: { type: String },
        yearOfEstablishment: { type: Number },
        annualTurnoverFY2023_24: { type: String },
        totalEmployees: { type: Number },
        reportingSystem: { type: String },
        certifications: { type: String },
    },

    // projectDetails: {
    //     name: { type: String },
    //     awardCategory: { type: String },
    //     organizationType: { type: String},
    //     annualCSRBudget: { type: String },
    //     gstNumber: { type: String },
    // },

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

    csrProjectReport: {
        communityNeedsAssessment: { type: String },
        implementationProcess: { type: String },
        implementationAgency: { type: String },
        resourceAllocation: { type: String },
        challenges: { type: String },
        improvisations: { type: String },
        impact: { type: String },
        sustainabilitySteps: { type: String },
    },

    attachments: {
        // organizationProfile: {
        //     name: { type: String },
        //     key: { type: String },
        //     size: { type: String },
        //     location: { type: String },
        // },
        // csrPolicyAndPractice: {
        //     name: { type: String },
        //     key: { type: String },
        //     size: { type: String },
        //     location: { type: String },
        // },

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
        certificate: {
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