const mongoose = require("mongoose");

const AttachmentSchema = new mongoose.Schema(
  {
    name: { type: String },
    key: { type: String },
    size: { type: String },
    location: { type: String },
  },
  { _id: false },
);

const SustainableEnterpriseSchema = new mongoose.Schema(
  {
    formName: { type: String, default: "SE" },
    enterpriseSize: { type: String },
    isKmaMember: { type: Boolean, default: false },
    membershipId: { type: String },

    organizationProfile: {
      name: { type: String },
      corporateOfficeLocation: { type: String },
      yearOfEstablishment: { type: Number },
      annualTurnoverFY2023_24: { type: String },
      marketCapitalization: { type: String },
      ownershipDetails: { type: String },
      briefDescription: { type: String },
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
      q24: { type: String },
      q25: { type: String },
      q26: { type: String },
      q27: { type: String },
      q28: { type: String },
      q29: { type: String },
      q30: { type: String },
      q31: { type: String },
      q32: { type: String },
    },

    contactDetails: {
      organizationName: { type: String },
      address: { type: String },
      contactPerson: { type: String },
      mobileNumber: { type: String },
      emailAddress: { type: String },
      website: { type: String },
    },

    attachments: {
      organizationProfile: {
        type: [AttachmentSchema],
        default: [],
      },
    },

    paymentDetails: {
      mode: { type: String },
      amount: { type: Number },
      amountWithGst: { type: Number },
      transactionId: { type: String },
      muid: { type: String },
      receipt: AttachmentSchema,
      status: { type: String },
    },
  },
  { timestamps: true },
);

const SustainableEnterprise = mongoose.model(
  "SustainableEnterprise",
  SustainableEnterpriseSchema,
);

module.exports = SustainableEnterprise;
