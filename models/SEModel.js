const mongoose = require("mongoose");

const SustainableEnterpriseSchema = new mongoose.Schema({
    formName: { type: String, default: "SE", immutable: true },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    organizationProfile: {
        name: { type: String, required: true },

        corporateOfficeLocation: { type: String },
        briefDescription: { type: String },
        ownershipDetails: { type: String },
        yearOfEstablishment: { type: Number },
        annualTurnoverFY2023_24: { type: String },
        marketCapitalization: { type: String },
        totalEmployees: { type: String },
    },

    sustainabilityGovernance: {
        integrationOfResponsibleBusiness: { type: String },
        esgTopics: { type: String },
        stakeholderEngagement: { type: String },
        seniorManagementResponsibilities: { type: String },
        sustainabilityMeasurements: { type: String },
        complianceProcess: { type: String },
        boardResponsibilities: { type: String },
    },

    sustainabilityIndicators: {
        ghgFootprint: { type: String },
        waterFootprint: { type: String },
        energyFootprint: { type: String },
        wasteManagement: { type: String },
        employeeWellBeing: { type: String },
        genderDiversity: { type: String },
        inclusiveDevelopment: { type: String },
        customerEngagement: { type: String },
        openness: { type: String },
    },

    sustainabilityFrameworks: {
        adoptedFrameworks: { type: String },
        isoStandards: { type: String },
        officeStandards: { type: String },
        thirdPartyAssurance: { type: String },
        innovativePractices: { type: String },
        awarenessInitiatives: { type: String },
        collaborativeInitiatives: { type: String },
        significantAchievements: { type: String },
        publicCommitments: { type: String },
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
        supportingDocuments: [{
            name: { type: String },
            key: { type: String },
            size: { type: String },
            location: { type: String },
        }],
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
