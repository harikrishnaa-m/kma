const mongoose = require("mongoose");

const SupportedDocumentSchema = new mongoose.Schema(
  {
    name: { type: String },
    key: { type: String },
    size: { type: String },
    location: { type: String },
  },
  { _id: false },
);

const ReceiptSchema = new mongoose.Schema(
  {
    name: { type: String },
    key: { type: String },
    location: { type: String },
  },
  { _id: false },
);

const PaymentDetailsSchema = new mongoose.Schema(
  {
    mode: { type: String },
    amountWithGst: { type: Number },
    transactionId: { type: String },
    muid: { type: String },
    receipt: ReceiptSchema,
    status: { type: String },
  },
  { _id: false },
);

const SISchema = new mongoose.Schema(
  {
    formName: { type: String, default: "Sustainability Innovation Award" },
    basicInformation: {
      organizationName: { type: String },
      contactDetails: { type: String },
      category: { type: String },
      membershipId: { type: String },
    },
    realImpact: {
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
    },
    economicSustainability: {
      q4: { type: String },
      q5: { type: String },
      q6: { type: String },
    },
    growthPotential: {
      q7: { type: String },
      q8: { type: String },
      q9: { type: String },
    },
    circularity: {
      q10: { type: String },
      q11: { type: String },
      q12: { type: String },
    },
    integrations: {
      q13: { type: String },
      q14: { type: String },
      q15: { type: String },
    },
    attachments: {
      supportedDocuments: [SupportedDocumentSchema],
    },
    isKmaMember: { type: Boolean },
    paymentDetails: PaymentDetailsSchema,
  },
  { timestamps: true },
);

const SustainabilityInnovation = mongoose.model(
  "SustainabilityInnovation",
  SISchema,
);
module.exports = SustainabilityInnovation;
