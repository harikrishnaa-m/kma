const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema(
  {
    formName: { type: String, default: "NGO" },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    organizationProfile: {
      name: { type: String },
      yearOfEstablishment: { type: String },
      legalStatus: { type: String },
      governingBodyDetails: { type: String },
      thematicAreas: { type: String },
      activeGeographies: { type: String },
      description: { type: String },
      purpose_q1: { type: String },
      purpose_q2: { type: String },
      purpose_q3: { type: String },
      purpose_q4: { type: String },
      strategy_q5: { type: String },
      strategy_q6: { type: String },
      strategy_q7: { type: String },
      strategy_q8: { type: String },
      strategy_q9: { type: String },
      strategy_q10: { type: String },
      gov_q11: { type: String },
      gov_q12: { type: String },
      gov_q13: { type: String },
      gov_q14: { type: String },
      mon_q15: { type: String },
      mon_q16: { type: String },
      mon_q17: { type: String },
      comp_q18: { type: String },
      comp_q19: { type: String },
    },

    projectDetails: [
      {
        id: { type: String },
        name: { type: String },
        keyTheme: { type: String },
        scaledExamples: { type: String },
        fundGenerations: { type: String },
        sourceOfFunding: { type: String },
        location: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        duration: {
          years: { type: Number },
          months: { type: Number },
          days: { type: Number },
        },
        totalAmountSpent: {
          fy_2020_21: { type: String },
          fy_2021_22: { type: String },
          fy_2022_23: { type: String },
          fy_2023_24: { type: String },
          total: { type: String },
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
        replicabilityProbability: { type: String },
      },
    ],

    attachments: {
      organizationProfile: [
        {
          name: { type: String },
          key: { type: String },
          size: { type: String },
          location: { type: String },
        },
      ],
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
      status: { type: String, default: "pending" },
    },
  },
  { timestamps: true },
);

const NGO = mongoose.model("NGO", NGOSchema);

module.exports = NGO;
