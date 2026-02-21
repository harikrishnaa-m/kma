const mongoose = require("mongoose");

const SustainabilityStartupSchema = new mongoose.Schema(
  {
    formName: { type: String, default: "SS" },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    organizationProfile: {
      name: { type: String, required: true },
      establishedDate: { type: String },
      foundersAndTeam: { type: String },
      location: { type: String },
      contactPerson: { type: String },
      mobile: { type: String },
      email: { type: String },
      website: { type: String },
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
      q4: { type: String },
      q5: { type: String },
      q6: { type: String },
      q7: { type: String },
      q8: { type: String },
      q9: { type: String },
      q10: { type: String },
      q11: { type: String },
      q12: { type: String },
      q13: { type: String },
      q14: { type: String },
      q15: { type: String },
      q16: { type: String },
      q17: { type: String },
      q18: { type: String },
      q19: { type: String },
      q20: { type: String },
      q21: { type: String },
      q22: { type: String },
      q23: { type: String },
    },

    generalOverview: {
      description: { type: String },
      sdgsAddressed: [{ type: String }],
    },

    businessModel: {
      primaryProductOrService: { type: String },
      uniqueValueProposition: { type: String },
      primaryCustomersOrBeneficiaries: { type: String },
      revenueModel: { type: String },
      startupStage: { type: String },
    },

    sustainabilityImpact: {
      positiveImpact: { type: String },
      longTermImpact: { type: String },
    },

    innovation: {
      technologiesOrProcesses: { type: String },
      scalability: { type: String },
      approach: { type: String },
    },

    marketAndFinancials: {
      targetMarketSize: { type: String },
      annualRevenueOrFunding: { type: String },
      partnerships: { type: String },
      grantsAwardsRecognitions: { type: String },
    },

    challengesAndGrowth: {
      majorChallenges: { type: String },
      supportNeeded: { type: String },
    },

    teamAndGovernance: {
      teamDiversity: { type: String },
      governanceStructure: { type: String },
    },

    attachments: {
      businessPlan: {
        type: [
          {
            name: String,
            key: String,
            size: Number,
            location: String,
          },
        ],
        default: [],
      },
      certifications: {
        type: {
          name: String,
          key: String,
          size: String,
          location: String,
        },
        default: null,
      },
      testimonialsOrCaseStudies: {
        type: {
          name: String,
          key: String,
          size: String,
          location: String,
        },
        default: null,
      },
      impactMetrics: {
        type: {
          name: String,
          key: String,
          size: String,
          location: String,
        },
        default: null,
      },
    },

    paymentDetails: {
      mode: String,
      amount: Number,
      amountWithGst: Number,
      transactionId: String,
      muid: String,
      receipt: {
        name: String,
        key: String,
        location: String,
        size: String,
      },
      status: {
        type: String,
        default: "pending",
      },
    },
  },
  { timestamps: true },
);

const SustainabilityStartup = mongoose.model(
  "SustainabilityStartup",
  SustainabilityStartupSchema,
);

module.exports = SustainabilityStartup;
