const mongoose = require("mongoose");

const SupportedDocumentSchema = new mongoose.Schema(
  {
    name: { type: String },
    key: { type: String },
    size: { type: Number },
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

const GCCSchema = new mongoose.Schema(
  {
    formName: { type: String, default: "GCC" },
    basicInformation: {
      organizationName: { type: String },
      contactDetails: { type: String },
    },
    sustainabilityVision: {
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
      q4: { type: String },
    },
    environmentalStewardship: {
      q5: { type: String },
      q6: { type: String },
      q7: { type: String },
      q8: { type: String },
    },
    humanCapital: {
      q9: { type: String },
      q10: { type: String },
      q11: { type: String },
      q12: { type: String },
    },
    ethicalBusiness: {
      q13: { type: String },
      q14: { type: String },
      q15: { type: String },
    },
    innovationImpact: {
      q16: { type: String },
      q17: { type: String },
      q18: { type: String },
    },
    performanceMeasurement: {
      q19: { type: String },
      q20: { type: String },
      q21: { type: String },
    },
    governanceRisk: {
      q22: { type: String },
      q23: { type: String },
      q24: { type: String },
    },
    assuranceFuture: {
      q25: { type: String },
      q26: { type: String },
      q27: { type: String },
    },
    attachments: {
      supportedDocuments: [SupportedDocumentSchema],
    },
    paymentDetails: {
      isKmaMember: {
        type: Boolean,
        default: false,
        set: (v) => {
          if (v === "" || v === null || v === undefined) return false;
          return v === true || v === "true";
        },
      },
      membershipId: { type: String },
      mode: { type: String },
      amount: { type: Number },
      amountWithGst: { type: Number },
      receipt: ReceiptSchema,
      transactionId: { type: String },
      muid: { type: String },
      status: { type: String, default: "pending" },
    },
  },
  { timestamps: true },
);

const GCC = mongoose.model("GCC", GCCSchema);

module.exports = GCC;
