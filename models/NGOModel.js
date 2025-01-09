const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
    formName: { type: String, default: "NGO", immutable: true },
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

        description: { type: String},
        yearOfEstablishment: { type: Number },
        legalStatus: { type: String, enum: ['Society', 'Trust', 'Section 8 Company'] },
        governingBodyDetails: [
            {
                name: { type: String },
                role: { type: String }
            }
        ],
        thematicAreas: [{ type: String }],
        activeGeographies: [{ type: String }],
    },

    projectDetails: [
        {
            name: { type: String },
            keyTheme: { type: String },
            sourceOfFunding: { type: String },
            location: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            duration: { type: String },
            totalAmountSpent: {
                "2020-21": { type: String },
                "2021-22": { type: String },
                "2022-23": { type: String },
                "2023-24": { type: String }
            },
            concernsAddressed: { type: String },
            stakeholders: [{ type: String }],
            totalBeneficiaries: { type: Number },
            innovativeMethods: { type: String },
            impact: {
                qualitative: { type: String },
                quantitative: { type: String }
            },
            impactAssessment: {
                conducted: { type: Boolean },
                by: { type: String, enum: ['Internal Resources', 'Third-Party Agency'] },
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