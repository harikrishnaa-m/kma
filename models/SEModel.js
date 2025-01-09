const mongoose = require("mongoose");

const SustainableEnterpriseSchema = new mongoose.Schema({
    formName: { type: String, default: "SE", immutable:true },
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
        
        corporateOfficeLocation: { type: String},
        briefDescription: { type: String, maxlength: 100},
        ownershipDetails: { type: String},
        yearOfEstablishment: { type: Number, required: true },
        annualTurnoverFY2023_24: { type: Number, required: true },
        marketCapitalization: { type: Number }, 
        totalEmployees: {
            fullTime: { type: Number },
            contract: { type: Number },
        },
    },

    sustainabilityGovernance: {
        integrationOfResponsibleBusiness: { type: String },
        esgTopics: { type: String }, 
        stakeholderEngagement: { type: String },
        seniorManagementResponsibilities: { type: String },
        sustainabilityMeasurements: { type: String }, 
        boardResponsibilities: { type: String }, 
    },

    sustainabilityIndicators: {
        ghgFootprint: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
        waterFootprint: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
        energyFootprint: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
        wasteManagement: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
        employeeWellBeing: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
        genderDiversity: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
        inclusiveDevelopment: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
        customerEngagement: { type: String, enum: ["Measured", "Planned to Measure", "Not Applicable"] },
    },

    sustainabilityFrameworks: {
        adoptedFrameworks: { type: [String] }, 
        isoStandards: { type: [String] }, 
        thirdPartyAssurance: { type: String }, 
        innovativePractices: { type: String },
        awarenessInitiatives: { type: String },
        significantAchievements: [{ type: String }], 
        publicCommitments: [{ type: String }], 
    },

    attachments: {
        organizationProfile: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
        sustainabilityReports: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
        thirdPartyAssuranceReport: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
        supportingDocuments: {
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        },
    },

    contactDetails: {
        organizationName: { type: String },
        address: { type: String },
        contactPerson: { type: String },
        mobileNumber: { type: String },
        emailAddress: { type: String },
        website: { type: String },
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

const SustainableEnterprise = mongoose.model("SustainableEnterprise", SustainableEnterpriseSchema);

module.exports = SustainableEnterprise;
