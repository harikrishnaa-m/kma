const SustainabilityInnovation = require("../models/SIModel");

const { isValidObjectId } = require("mongoose");
const NGO = require("../models/NGOModel");
const CSR = require("../models/CSRModel");
const GCC = require("../models/GCCModel.js");
const { v4: uuidv4 } = require("uuid");

// const crypto = require("crypto");
const axios = require("axios");

let cachedToken = null;
let tokenExpiry = null;

const qs = require("qs");

async function getAccessToken() {
  try {
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      console.log("Using cached token");
      return cachedToken;
    }

    const tokenUrl =
      "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

    console.log("========== PHONEPE TOKEN REQUEST ==========");
    console.log("URL:", tokenUrl);
    console.log("Client ID:", process.env.CLIENT_ID);
    console.log("===========================================");

    const response = await axios.post(
      tokenUrl,
      qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_version: process.env.CLIENT_VERSION,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log("========== TOKEN SUCCESS ==========");
    console.log(response.data);
    console.log("===================================");

    const { access_token, expires_at } = response.data;

    cachedToken = access_token;

    // expires_at is epoch seconds
    tokenExpiry = expires_at * 1000 - 60000; // refresh 1 min early

    return access_token;
  } catch (error) {
    console.error("========== TOKEN ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    console.error("=================================");

    throw error;
  }
}

const generateMail = require("../utils/NodeMailer.js");
const SustainableEnterprise = require("../models/SEModel.js");
const SustainabilityStartup = require("../models/SSModel.js");
const cron = require("node-cron");

const applicationCtrl = {};

// ID Generate
function generateTransactionId() {
  const uuid = uuidv4();
  return `T-${uuid.substring(0, 8).toUpperCase()}`;
}

// Create GCC Application
applicationCtrl.CreateGCC = async (req, res) => {
  const createObj = req.body;
  try {
    // ✅ SANITIZE BOOLEAN HERE
    // if (createObj?.paymentDetails) {
    //   if (createObj.paymentDetails.isKmaMember === "") {
    //     delete createObj.paymentDetails.isKmaMember;
    //   }
    // }

    if (!createObj?.basicInformation?.organizationName?.trim())
      return res.status(400).json({ msg: "Bad Request" });
    if (createObj?.paymentDetails?.mode === "Online") {
      createObj.paymentDetails.status = "pending";
      createObj.paymentDetails.muid = "MUID" + Date.now();
      createObj.paymentDetails.transactionId = generateTransactionId();
      console.log(
        "merchantTransactionId:",
        createObj.paymentDetails.transactionId,
      );
      const newGCC = await GCC.create(createObj);
      if (!newGCC) {
        return res.status(500).json({ msg: "Failed to register application" });
      }
      await newPayment(req, res, newGCC);
      return;
    } else {
      createObj.paymentDetails.status = "completed";
      const newGCC = await GCC.create(createObj);
      return res.status(200).json(newGCC);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Create SI Application
applicationCtrl.CreateSI = async (req, res) => {
  const createObj = req.body;
  try {
    if (!createObj?.basicInformation?.organizationName?.trim())
      return res.status(400).json({ msg: "Bad Request" });
    if (createObj?.paymentDetails?.mode === "Online") {
      createObj.paymentDetails.status = "pending";
      createObj.paymentDetails.muid = "MUID" + Date.now();
      createObj.paymentDetails.transactionId = generateTransactionId();
      const newSI = await SustainabilityInnovation.create(createObj);
      if (!newSI) {
        return res.status(500).json({ msg: "Failed to register application" });
      }
      await newPayment(req, res, newSI);
      return;
    } else {
      createObj.paymentDetails.status = "completed";
      const newSI = await SustainabilityInnovation.create(createObj);
      return res.status(200).json(newSI);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Create NGO Application;
applicationCtrl.CreateNGO = async (req, res) => {
  const createObj = req.body;

  try {
    if (!createObj?.organizationProfile?.name?.trim())
      return res.status(400).json({ msg: "Bad Request" });

    if (createObj?.paymentDetails?.mode === "Online") {
      createObj.paymentDetails.status = "pending";
      createObj.paymentDetails.muid = "MUID" + Date.now();
      createObj.paymentDetails.transactionId = generateTransactionId();

      const newNGOAppln = await NGO.create(createObj);
      if (!newNGOAppln) {
        return res.status(500).json({ msg: "Failed to register application" });
      }

      await newPayment(req, res, newNGOAppln);
      return;
    } else {
      createObj.paymentDetails.status = "completed";
      const newNGOAppln = await NGO.create(createObj);
      return res.status(200).json(newNGOAppln);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Create CSR Application;
applicationCtrl.CreateCSR = async (req, res) => {
  const createObj = req.body;

  try {
    if (!createObj?.organizationProfile?.name?.trim())
      return res.status(400).json({ msg: "Bad Request" });

    // conditionally check this is a online or offline payment
    if (createObj?.paymentDetails?.mode === "Online") {
      createObj.paymentDetails.status = "pending";
      createObj.paymentDetails.muid = "MUID" + Date.now();
      createObj.paymentDetails.transactionId = generateTransactionId();

      const newCSRAppln = await CSR.create(createObj);
      if (!newCSRAppln) {
        return res.status(500).json({ msg: "Failed to register application" });
      }
      await newPayment(req, res, newCSRAppln);
      return;
    } else {
      createObj.paymentDetails.status = "completed";
      const newCSRAppln = await CSR.create(createObj);
      return res.status(200).json(newCSRAppln);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

applicationCtrl.CreateSE = async (req, res) => {
  const createObj = req.body;

  try {
    if (!createObj?.organizationProfile?.name?.trim())
      return res.status(400).json({ msg: "Bad Request" });

    if (createObj?.paymentDetails?.mode === "Online") {
      createObj.paymentDetails.status = "pending";
      createObj.paymentDetails.muid = "MUID" + Date.now();
      createObj.paymentDetails.transactionId = generateTransactionId();

      const newSEAppln = await SustainableEnterprise.create(createObj);
      if (!newSEAppln) {
        return res.status(500).json({ msg: "Failed to register application" });
      }
      await newPayment(req, res, newSEAppln);
      return;
    } else {
      createObj.paymentDetails.status = "completed";
      const newSEAppln = await SustainableEnterprise.create(createObj);
      return res.status(200).json(newSEAppln);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

applicationCtrl.CreateSS = async (req, res) => {
  const createObj = req.body;

  try {
    if (!createObj?.organizationProfile?.name?.trim())
      return res.status(400).json({ msg: "Bad Request" });

    if (createObj?.paymentDetails?.mode === "Online") {
      createObj.paymentDetails.status = "pending";
      createObj.paymentDetails.muid = "MUID" + Date.now();
      createObj.paymentDetails.transactionId = generateTransactionId();

      const newSSAppln = await SustainabilityStartup.create(createObj);
      if (!newSSAppln) {
        return res.status(500).json({ msg: "Failed to register application" });
      }
      await newPayment(req, res, newSSAppln);
      return;
    } else {
      createObj.paymentDetails.status = "completed";
      const newSSAppln = await SustainabilityStartup.create(createObj);
      return res.status(200).json(newSSAppln);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Payment integration
// const newPayment = async (req, res, obj) => {
//   console.log(obj);
//   try {
//     const merchantTransactionId = obj.paymentDetails.transactionId;
//     const data = {
//       merchantId: process.env.MERCHANT_ID,
//       merchantTransactionId: merchantTransactionId,
//       merchantUserId: obj.paymentDetails.muid,
//       amount: obj?.paymentDetails?.amountWithGst * 100,
//       redirectUrl: `${process.env.SERVER_URL}/api/application/status/${merchantTransactionId}`,
//       redirectMode: "POST",
//       callbackUrl: `${process.env.SERVER_URL}/api/application/status/${merchantTransactionId}`,
//       paymentInstrument: {
//         type: "PAY_PAGE",
//       },
//     };
//     const payload = JSON.stringify(data);
//     const payloadMain = Buffer.from(payload).toString("base64");
//     const keyIndex = 1;
//     const string = payloadMain + "/pg/v1/pay" + process.env.SALT_KEY;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###" + keyIndex;

//     const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
//     // const prod_URL =
//     //   "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

//     const options = {
//       method: "POST",
//       url: prod_URL,
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-VERIFY": checksum,
//       },
//       data: {
//         request: payloadMain,
//       },
//     };

//     const response = await axios.request(options);
//     return res.status(201).json(response.data.data.instrumentResponse);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Payment processing error" });
//   }
// };
const newPayment = async (req, res, obj) => {
  try {
    const accessToken = await getAccessToken();
    const merchantOrderId = obj.paymentDetails.transactionId;

    const payload = {
      merchantOrderId,
      amount: obj.paymentDetails.amountWithGst * 100,
      expireAfter: 1200,
      paymentFlow: {
        type: "PG_CHECKOUT",
        message: "KMA Application Fee",
        merchantUrls: {
          redirectUrl: `${process.env.SERVER_URL}/api/application/status/${merchantOrderId}`,
        },
      },
      metaInfo: {
        udf1: "KMA_APPLICATION",
      },
    };

    const response = await axios.post(
      "https://api.phonepe.com/apis/pg/checkout/v2/pay",
      payload,
      {
        headers: {
          Authorization: `O-Bearer ${accessToken}`, // ✅ FIXED
          "Content-Type": "application/json",
        },
      },
    );

    console.log("PAYMENT SUCCESS RESPONSE:", response.data);

    return res.status(201).json({
      redirectUrl: response.data.redirectUrl,
    });
  } catch (error) {
    console.error("============== PHONEPE ERROR ==============");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Full Error:", error.message);
    console.error("Request URL:", error.config?.url);
    console.error("===========================================");

    return res.status(500).json({
      msg: "Payment processing error",
      error: error.response?.data || error.message,
    });
  }
};
// applicationCtrl.checkStatus = async (req, res) => {
//   const merchantTransactionId = req.params.txnId;
//   console.log({ merchantTransactionId }, "checksum check");

//   try {
//     let docWithExistingTxnId =
//       (await NGO.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       }).lean()) ||
//       (await CSR.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       }).lean()) ||
//       (await SustainableEnterprise.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       }).lean()) ||
//       (await SustainabilityStartup.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       }).lean());

//     const keyIndex = 1;
//     const string =
//       `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` +
//       process.env.SALT_KEY;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###" + keyIndex;

//     const options = {
//       method: "GET",
//       //   url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
//       url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,

//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-VERIFY": checksum,
//         "X-MERCHANT-ID": process.env.MERCHANT_ID,
//       },
//     };

//     const response = await axios.request(options); // Fix: Await axios request

//     if (
//       response.data.success === true &&
//       response?.data.code === "PAYMENT_SUCCESS"
//     ) {
//       const updateData = { $set: { "paymentDetails.status": "completed" } };

//       if (docWithExistingTxnId?.formName === "NGO") {
//         await NGO.findByIdAndUpdate(docWithExistingTxnId._id, updateData, {
//           new: true,
//         });
//       } else if (docWithExistingTxnId?.formName === "CSR") {
//         await CSR.findByIdAndUpdate(docWithExistingTxnId._id, updateData, {
//           new: true,
//         });
//       } else if (docWithExistingTxnId?.formName === "SE") {
//         await SustainableEnterprise.findByIdAndUpdate(
//           docWithExistingTxnId._id,
//           updateData,
//           { new: true },
//         );
//       } else if (docWithExistingTxnId?.formName === "SS") {
//         await SustainabilityStartup.findByIdAndUpdate(
//           docWithExistingTxnId._id,
//           updateData,
//           { new: true },
//         );
//       }

//       return res.redirect("https://www.kma.qmarkdesk.com/success");
//     } else {
//       return res.redirect("https://www.kma.qmarkdesk.com/failure");
//     }
//   } catch (error) {
//     console.error(error);
//     return res.redirect("https://www.kma.qmarkdesk.com/failure");
//   }
// };

// applicationCtrl.checkStatus = async (req, res) => {
//   const merchantTransactionId = req.params.txnId;

//   try {
//     // IMPORTANT: include SustainabilityInnovation and REMOVE .lean()
//     let docWithExistingTxnId =
//       (await SustainabilityInnovation.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       })) ||
//       (await NGO.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       })) ||
//       (await CSR.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       })) ||
//       (await SustainableEnterprise.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       })) ||
//       (await SustainabilityStartup.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       })) ||
//       (await GCC.findOne({
//         "paymentDetails.transactionId": merchantTransactionId,
//       }));

//     if (!docWithExistingTxnId) {
//       console.log("Transaction not found in DB");
//       return res.redirect(process.env.PAYMENT_FAILURE_URL);
//     }

//     const keyIndex = 1;

//     const string =
//       `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` +
//       process.env.SALT_KEY;

//     const checksum =
//       crypto.createHash("sha256").update(string).digest("hex") +
//       "###" +
//       keyIndex;

//     const response = await axios.get(
//       `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-VERIFY": checksum,
//           "X-MERCHANT-ID": process.env.MERCHANT_ID,
//         },
//       },
//     );

//     if (
//       response.data.success === true &&
//       response.data.code === "PAYMENT_SUCCESS"
//     ) {
//       await docWithExistingTxnId.updateOne({
//         $set: { "paymentDetails.status": "completed" },
//       });

//       console.log("Payment status updated successfully");

//       return res.redirect(process.env.PAYMENT_SUCCESS_URL);
//     }

//     console.log("Payment not successful");

//     return res.redirect(process.env.PAYMENT_FAILURE_URL);
//   } catch (error) {
//     console.error("PhonePe status check error:", error.message);
//     return res.redirect(process.env.PAYMENT_FAILURE_URL);
//   }
// };
applicationCtrl.checkStatus = async (req, res) => {
  const merchantOrderId = req.params.txnId;

  try {
    const accessToken = await getAccessToken();

    console.log("===== CHECK STATUS =====");
    console.log("Order ID:", merchantOrderId);

    const response = await axios.get(
      `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantOrderId}/status?details=false`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${accessToken}`,
        },
      },
    );

    console.log("STATUS RESPONSE:", response.data);

    const status = response.data?.state;

    if (status === "COMPLETED") {
      await updatePaymentStatus(merchantOrderId, "completed");
      return res.redirect(process.env.PAYMENT_SUCCESS_URL);
    }

    if (status === "FAILED") {
      await updatePaymentStatus(merchantOrderId, "failed");
      return res.redirect(process.env.PAYMENT_FAILURE_URL);
    }

    // If PENDING
    return res.redirect(process.env.PAYMENT_FAILURE_URL);
  } catch (error) {
    console.error("===== STATUS ERROR =====");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("========================");

    return res.redirect(process.env.PAYMENT_FAILURE_URL);
  }
};
//HELPER updatePaymentStatus
async function updatePaymentStatus(orderId, status) {
  const models = [
    SustainabilityInnovation,
    NGO,
    CSR,
    SustainableEnterprise,
    SustainabilityStartup,
    GCC,
  ];

  for (const model of models) {
    const doc = await model.findOne({
      "paymentDetails.transactionId": orderId,
    });

    if (doc) {
      await doc.updateOne({
        $set: { "paymentDetails.status": status },
      });
      break;
    }
  }
}

applicationCtrl.GetAllApplications = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;
  const searchQuery = req.query.search;

  try {
    let query = { "paymentDetails.status": "completed" };
    if (searchQuery) {
      query = {
        $or: [
          {
            "organizationProfile.name": { $regex: searchQuery, $options: "i" },
          },
          {
            "organizationProfile.head": { $regex: searchQuery, $options: "i" },
          },
          {
            "organizationProfile.email": { $regex: searchQuery, $options: "i" },
          },
        ],
      };
    }

    const allNGOs = await NGO.find(query);
    const allCSRs = await CSR.find(query);
    const allSEs = await SustainableEnterprise.find(query);
    const allSSs = await SustainabilityStartup.find(query);
    const allSIs = await SustainabilityInnovation.find(query);
    const allGCCs = await GCC.find(query);

    let result = [
      ...allSIs,
      ...allNGOs,
      ...allCSRs,
      ...allSEs,
      ...allSSs,
      ...allGCCs,
    ];

    // Sort the result based on the time property
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Applying pagination
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedResult = result.slice(startIndex, endIndex);

    res.status(200).json(paginatedResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

applicationCtrl.GetAllNGOs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;
  try {
    const allNGOs = await NGO.find({ "paymentDetails.status": "completed" });

    // Applying pagination
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedResult = allNGOs.slice(startIndex, endIndex);

    res.status(200).json(paginatedResult);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

applicationCtrl.GetAllCSRs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;
  try {
    const allCSRs = await CSR.find({ "paymentDetails.status": "completed" });

    // Applying pagination
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedResult = allCSRs.slice(startIndex, endIndex);

    res.status(200).json(paginatedResult);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

applicationCtrl.GetAllSEs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;
  try {
    const allSEs = await SustainableEnterprise.find({
      "paymentDetails.status": "completed",
    });

    // Applying pagination
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedResult = allSEs.slice(startIndex, endIndex);

    res.status(200).json(paginatedResult);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

applicationCtrl.GetAllSSs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;
  try {
    const allSSs = await SustainabilityStartup.find({
      "paymentDetails.status": "completed",
    });

    // Applying pagination
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedResult = allSSs.slice(startIndex, endIndex);

    res.status(200).json(paginatedResult);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

applicationCtrl.GetSingle = async (req, res) => {
  let applicationId = req.params.id;
  const type = req.query.type;

  applicationId = applicationId.trim();

  const isValid = isValidObjectId(applicationId);
  if (!isValid) return res.status(400).json({ msg: "Person UnAuthorized" });

  try {
    let result;

    if (type === "NGO") {
      result = await NGO.findById(applicationId);
    } else if (type === "CSR") {
      result = await CSR.findById(applicationId);
    } else if (type === "SE") {
      result = await SustainableEnterprise.findById(applicationId);
    } else if (type === "SS") {
      result = await SustainabilityStartup.findById(applicationId);
    } else if (type === "SI") {
      const SustainabilityInnovation = require("../models/SIModel");
      result = await SustainabilityInnovation.findById(applicationId);
    } else if (type === "GCC") {
      const GCC = require("../models/GCCModel");
      result = await GCC.findById(applicationId);
    }

    if (!result) return res.status(404).json({ msg: "Application not found" });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// async function checkPendingPayments() {
//   const pendingPayments = await Promise.all([
//     NGO.find({ "paymentDetails.status": "pending" }),
//     CSR.find({ "paymentDetails.status": "pending" }),
//     SustainableEnterprise.find({ "paymentDetails.status": "pending" }),
//     SustainabilityStartup.find({ "paymentDetails.status": "pending" }),
//   ]);

//   const allPendingPayments = pendingPayments.flat();

//   for (const payment of allPendingPayments) {
//     const merchantTransactionId = payment.paymentDetails.transactionId;

//     if (!merchantTransactionId?.trim()) {
//       console.log("No merchantTransactionId");
//       continue;
//     }

//     const keyIndex = 1;
//     const string =
//       `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` +
//       process.env.SALT_KEY;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###" + keyIndex;

//     const options = {
//       method: "GET",

//       //   url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
//       url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,

//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-VERIFY": checksum,
//         "X-MERCHANT-ID": process.env.MERCHANT_ID,
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       if (
//         response.data.success === true &&
//         response?.data.code === "PAYMENT_SUCCESS"
//       ) {
//         await payment.updateOne({
//           $set: { "paymentDetails.status": "completed" },
//         });
//         console.log(`Payment status updated for ${merchantTransactionId}`);
//       }
//     } catch (error) {
//       console.error(
//         `Failed to check payment status for ${merchantTransactionId}:`,
//         error,
//       );
//     }
//   }
// }
// async function checkPendingPayments() {
//   const pendingPayments = await Promise.all([
//     SustainabilityInnovation.find({ "paymentDetails.status": "pending" }),
//     NGO.find({ "paymentDetails.status": "pending" }),
//     CSR.find({ "paymentDetails.status": "pending" }),
//     SustainableEnterprise.find({ "paymentDetails.status": "pending" }),
//     SustainabilityStartup.find({ "paymentDetails.status": "pending" }),
//     GCC.find({ "paymentDetails.status": "pending" }),
//   ]);

//   const allPendingPayments = pendingPayments.flat();

//   for (const payment of allPendingPayments) {
//     const merchantTransactionId = payment.paymentDetails.transactionId;

//     if (!merchantTransactionId?.trim()) continue;

//     const keyIndex = 1;

//     const string =
//       `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` +
//       process.env.SALT_KEY;

//     const checksum =
//       crypto.createHash("sha256").update(string).digest("hex") +
//       "###" +
//       keyIndex;

//     try {
//       const response = await axios.get(
//         `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-VERIFY": checksum,
//             "X-MERCHANT-ID": process.env.MERCHANT_ID,
//           },
//         },
//       );

//       if (
//         response.data.success === true &&
//         response.data.code === "PAYMENT_SUCCESS"
//       ) {
//         await payment.updateOne({
//           $set: { "paymentDetails.status": "completed" },
//         });

//         console.log("Cron updated:", merchantTransactionId);
//       }
//     } catch (error) {
//       console.error("Cron error:", merchantTransactionId);
//     }
//   }
// }

// cron.schedule("*/2 * * * *", () => {
//   console.log("Running scheduled payment check...");
//   checkPendingPayments();
// });

// Get all SI applications
applicationCtrl.GetAllSIs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;
  try {
    const SustainabilityInnovation = require("../models/SIModel");
    const allSIs = await SustainabilityInnovation.find({
      "paymentDetails.status": "completed",
    });
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedResult = allSIs.slice(startIndex, endIndex);
    res.status(200).json(paginatedResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Get all GCC applications
applicationCtrl.GetAllGCCs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;
  try {
    const GCC = require("../models/GCCModel");
    const allGCCs = await GCC.find({ "paymentDetails.status": "completed" });
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;
    const paginatedResult = allGCCs.slice(startIndex, endIndex);
    res.status(200).json(paginatedResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
async function reconcilePendingPayments() {
  try {
    console.log("Running payment reconciliation...");

    const models = [
      SustainabilityInnovation,
      NGO,
      CSR,
      SustainableEnterprise,
      SustainabilityStartup,
      GCC,
    ];

    for (const model of models) {
      const pendingPayments = await model.find({
        "paymentDetails.status": "pending",
      });

      for (const payment of pendingPayments) {
        const merchantOrderId = payment.paymentDetails.transactionId;

        if (!merchantOrderId) continue;

        try {
          const accessToken = await getAccessToken();

          const response = await axios.get(
            `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantOrderId}/status?details=false`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `O-Bearer ${accessToken}`,
              },
            },
          );

          const state = response.data?.state;

          if (state === "COMPLETED") {
            await payment.updateOne({
              $set: { "paymentDetails.status": "completed" },
            });
            console.log("Updated to COMPLETED:", merchantOrderId);
          }

          if (state === "FAILED") {
            await payment.updateOne({
              $set: { "paymentDetails.status": "failed" },
            });
            console.log("Updated to FAILED:", merchantOrderId);
          }
        } catch (err) {
          console.log("Status check failed:", merchantOrderId);
        }
      }
    }
  } catch (error) {
    console.error("Cron Error:", error.message);
  }
}

module.exports = { ...applicationCtrl, reconcilePendingPayments };
