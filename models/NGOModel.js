const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
    formName: { type: String, default: "NGO", immutable:true },

    organizationProfile: {
        name: { type: String, required: true },
        address: { type: String },
        contactPerson: {type: String },
        mobile: { type: String },
        email: { type: String },
        website: { type: String },
        head: { type: String },
        
        description: { type: String, maxlength: 50, required: true },
        yearOfEstablishment: { type: Number, required: true },
        legalStatus: { type: String, enum: ['Society', 'Trust', 'Section 8 Company'], required: true },
        governingBodyDetails: [
            {
                name: { type: String, required: true },
                role: { type: String, required: true }
            }
        ],
        thematicAreas: [{ type: String, required: true }],
        activeGeographies: [{ type: String, required: true }],
    },

    projectDetails: [
        {
            name: { type: String, required: true },
            keyTheme: { type: String, required: true },
            sourceOfFunding: { type: String, required: true },
            location: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            duration: { type: String, required: true },
            totalAmountSpent: {
                "2020-21": { type: Number, default: 0 },
                "2021-22": { type: Number, default: 0 },
                "2022-23": { type: Number, default: 0 },
                "2023-24": { type: Number, default: 0 }
            },
            concernsAddressed: { type: String, required: true },
            stakeholders: [{ type: String, required: true }],
            totalBeneficiaries: { type: Number, required: true },
            innovativeMethods: { type: String },
            impact: {
                qualitative: { type: String },
                quantitative: { type: String }
            },
            impactAssessment: {
                conducted: { type: Boolean, required: true },
                by: { type: String, enum: ['Internal Resources', 'Third-Party Agency'] },
                thirdPartyAgencyName: { type: String },
                report: {
                    name: { type: String },
                    key: { type: String },
                    size: { type: String },
                    location: { type: String },
                },
            },
            sustainabilityStrategy: { type: String, required: true },
            replicabilityProbability: { type: String, required: true }
        }
    ],

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