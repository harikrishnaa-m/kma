const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
    formName: { type: String, default: "NGO", immutable: true },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    
    organizationProfile: {
        name: { type: String, required: true },
        description: { type: String },
        yearOfEstablishment: { type: Number },
        legalStatus: { type: String },
        governingBodyDetails: { type: String },
        thematicAreas: { type: String },
        activeGeographies: { type: String },
    },
    
    projectDetails: [{
        name: { type: String },

        scaledExamples: { type: String },
        fundGenerations: { type: String },
        
        keyTheme: { type: String },
        sourceOfFunding: { type: String },
        location: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        duration: {
            type: {
                years: { type: Number },
                months: { type: Number },
                days: { type: Number },
            }
        },
        totalAmountSpent: {
            type: {
                fy_2020_21: { type: String },
                fy_2021_22: { type: String },
                fy_2022_23: { type: String },
                fy_2023_24: { type: String },
                total: { type: String },
            }
        },
        needBaselineStudies: { type: String },
        concernsAddressed: { type: String },
        objectiveAlignment: { type: String },
        stakeholders: { type: String },
        totalBeneficiaries: { type: Number },
        innovativeMethods: { type: String },
        donorMonitor: { type: String },
        impact: { type: String },
        impactAssessment: {
            conducted: { type: Boolean },
            by: { type: String },
            thirdPartyAgencyName: { type: String },
            report: {
                name: { type: String },
                key: { type: String },
                size: { type: String },
                location: { type: String },
            },
        },
        sustainabilityStrategy: { type: String },
        replicabilityProbability: { type: String }
    }],

    attachments: {
        organizationProfile: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },

        csrPolicy: {
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
        impactAssessmentReport: {
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

const NGO = mongoose.model("NGO", NGOSchema);

module.exports = NGO;