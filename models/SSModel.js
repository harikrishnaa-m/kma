const mongoose = require("mongoose");

const SustainabilityStartupSchema = new mongoose.Schema({
    formName: { type: String, default: "SS", immutable:true },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },
    
    organizationProfile: {
        name: { type: String, required: true },
        address: { type: String },
        contactPerson: {type: String },
        mobile: { type: String },
        email: { type: String },
        website: { type: String },
        head: { type: String },
        
        establishedDate: { type: Date },
        foundersAndTeam: { type: String },
        location: { type: String },
        contactDetails: {
            contactPersonName: { type: String },
            mobileNumber: { type: String },
            emailAddress: { type: String },
            websiteOrSocialLinks: { type: [String] },
        },
    },

    generalOverview: {
        description: { type: String },
        sdgsAddressed: { type: [String] },
    },

    businessModel: {
        primaryProductOrService: { type: String },
        uniqueValueProposition: { type: String },
        primaryCustomersOrBeneficiaries: { type: String },
        startupStage: {
            type: String,
            enum: ["Idea Stage", "MVP", "Early Growth", "Scaling"],
            required: true
        },
    },

    sustainabilityImpact: {
        positiveImpact: { type: String },
        measurableResults: { type: String },
        longTermImpact: { type: String },
    },

    innovation: {
        technologiesOrProcesses: { type: String },
        scalability: { type: String },
    },

    attachments: {
        businessPlan: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String }
        },
        certifications: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String }
        },
        testimonialsOrCaseStudies: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String }
        },
        impactMetrics: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String }
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

}, { timestamps: true });

const SustainabilityStartup = mongoose.model("SustainabilityStartup", SustainabilityStartupSchema);

module.exports = SustainabilityStartup;
