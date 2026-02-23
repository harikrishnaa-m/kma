const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema(
  {
    formName: { type: String, default: "CSR" },
    organizationCategory: { type: String },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

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
      q18: { type: String },
      q20: { type: String },
      q21: { type: String },
      q22: { type: String },
    },

    attachments: {
      certificates: [
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

const CSR = mongoose.model("CSR", CSRSchema);

module.exports = CSR;
