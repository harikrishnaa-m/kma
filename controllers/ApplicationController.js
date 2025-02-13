const { isValidObjectId } = require("mongoose");
const NGO = require("../models/NGOModel");
const CSR = require("../models/CSRModel");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const axios = require('axios');

const generateMail = require('../utils/NodeMailer.js');
const SustainableEnterprise = require("../models/SEModel.js");
const SustainabilityStartup = require("../models/SSModel.js");
const cron = require("node-cron");

const applicationCtrl = {};

// ID Generate
function generateTransactionId() {
    const uuid = uuidv4();
    return `T-${uuid.substring(0, 8).toUpperCase()}`;
}

// Create NGO Application;
applicationCtrl.CreateNGO = async (req, res) => {

    const createObj = req.body;

    try {

        if (!createObj?.organizationProfile?.name?.trim()) return res.status(400).json({ msg: "Bad Request" })

        if (createObj?.paymentDetails?.mode === 'Online') {
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = generateTransactionId();

            const newNGOAppln = await NGO.create(createObj);
            if (!newNGOAppln) {
                return res.status(500).json({ msg: "Failed to register application" });
            }

            await newPayment(req, res, newNGOAppln)
            return
        } else {
            createObj.paymentDetails.status = 'completed'
            const newNGOAppln = await NGO.create(createObj);
            return res.status(200).json(newNGOAppln);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
}

// Create CSR Application;
applicationCtrl.CreateCSR = async (req, res) => {
    const createObj = req.body;

    try {

        if (!createObj?.organizationProfile?.name?.trim()) return res.status(400).json({ msg: "Bad Request" })

        // conditionally check this is a online or offline payment
        if (createObj?.paymentDetails?.mode === 'Online') {
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = generateTransactionId();

            const newCSRAppln = await CSR.create(createObj);
            if (!newCSRAppln) {
                return res.status(500).json({ msg: "Failed to register application" });
            }
            await newPayment(req, res, newCSRAppln)
            return
        } else {
            createObj.paymentDetails.status = 'completed'
            const newCSRAppln = await CSR.create(createObj);
            return res.status(200).json(newCSRAppln);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
}


applicationCtrl.CreateSE = async (req, res) => {
    const createObj = req.body;

    try {

        if (!createObj?.organizationProfile?.name?.trim()) return res.status(400).json({ msg: "Bad Request" })

        if (createObj?.paymentDetails?.mode === 'Online') {
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = generateTransactionId();

            const newSEAppln = await SustainableEnterprise.create(createObj);
            if (!newSEAppln) {
                return res.status(500).json({ msg: "Failed to register application" });
            }
            await newPayment(req, res, newSEAppln)
            return
        } else {
            createObj.paymentDetails.status = 'completed'
            const newSEAppln = await SustainableEnterprise.create(createObj);
            return res.status(200).json(newSEAppln);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
}

applicationCtrl.CreateSS = async (req, res) => {
    const createObj = req.body;

    try {
        if (!createObj?.organizationProfile?.name?.trim()) return res.status(400).json({ msg: "Bad Request" })

        if (createObj?.paymentDetails?.mode === 'Online') {
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = generateTransactionId();

            const newSSAppln = await SustainabilityStartup.create(createObj);
            if (!newSSAppln) {
                return res.status(500).json({ msg: "Failed to register application" });
            }
            await newPayment(req, res, newSSAppln)
            return
        } else {
            createObj.paymentDetails.status = 'completed'
            const newSSAppln = await SustainabilityStartup.create(createObj);
            return res.status(200).json(newSSAppln);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
}



// Payment integration
const newPayment = async (req, res, obj) => {

    console.log(obj)
    try {
        const merchantTransactionId = obj.paymentDetails.transactionId;
        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: obj.paymentDetails.muid,
            amount: obj?.paymentDetails?.amountWithGst * 100,
            redirectUrl: `${process.env.SERVER_URL}/api/application/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            callbackUrl: `${process.env.SERVER_URL}/api/application/status/${merchantTransactionId}`,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const response = await axios.request(options);
        return res.status(201).json(response.data.data.instrumentResponse);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Payment processing error" });
    }
}

applicationCtrl.checkStatus = async (req, res) => {
    const merchantTransactionId = req.params.txnId;
    console.log({ merchantTransactionId }, "checksum check");

    try {
        let docWithExistingTxnId = await NGO.findOne({ "paymentDetails.transactionId": merchantTransactionId }).lean() ||
            await CSR.findOne({ "paymentDetails.transactionId": merchantTransactionId }).lean() ||
            await SustainableEnterprise.findOne({ "paymentDetails.transactionId": merchantTransactionId }).lean() ||
            await SustainabilityStartup.findOne({ "paymentDetails.transactionId": merchantTransactionId }).lean();

        if (docWithExistingTxnId) {
            return res.redirect("https://www.kma.qmarkdesk.com/success");
        }

        const keyIndex = 1;
        const string = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + "###" + keyIndex;

        const options = {
            method: 'GET',
            url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': process.env.MERCHANT_ID
            }
        };

        const response = await axios.request(options); // Fix: Await axios request

        if (response.data.success === true && response?.data.code === 'PAYMENT_SUCCESS') {
            const updateData = { $set: { 'paymentDetails.status': 'completed' } };

            if (docWithExistingTxnId?.formName === "NGO") {
                await NGO.findByIdAndUpdate(docWithExistingTxnId._id, updateData, { new: true });
            } else if (docWithExistingTxnId?.formName === "CSR") {
                await CSR.findByIdAndUpdate(docWithExistingTxnId._id, updateData, { new: true });
            } else if (docWithExistingTxnId?.formName === "SE") {
                await SustainableEnterprise.findByIdAndUpdate(docWithExistingTxnId._id, updateData, { new: true });
            } else if (docWithExistingTxnId?.formName === "SS") {
                await SustainabilityStartup.findByIdAndUpdate(docWithExistingTxnId._id, updateData, { new: true });
            }

            return res.redirect("https://www.kma.qmarkdesk.com/success");
        } else {
            return res.redirect("https://www.kma.qmarkdesk.com/failure");
        }
    } catch (error) {
        console.error(error);
        return res.redirect("https://www.kma.qmarkdesk.com/failure");
    }
};


applicationCtrl.GetAllApplications = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const entries = parseInt(req.query.entries) || 10;
    const searchQuery = req.query.search;

    try {
        let query = { 'paymentDetails.status': 'completed' };
        if (searchQuery) {
            query = {
                $or: [
                    { "organizationProfile.name": { $regex: searchQuery, $options: 'i' } },
                    { "organizationProfile.head": { $regex: searchQuery, $options: 'i' } },
                    { "organizationProfile.email": { $regex: searchQuery, $options: 'i' } },
                ]
            };
        }

        const allNGOs = await NGO.find(query);
        const allCSRs = await CSR.find(query);
        const allSEs = await SustainableEnterprise.find(query);
        const allSSs = await SustainabilityStartup.find(query);

        let result = [...allNGOs, ...allCSRs, ...allSEs, ...allSSs];

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
}



applicationCtrl.GetAllNGOs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const entries = parseInt(req.query.entries) || 10;
    try {
        const allNGOs = await NGO.find({ 'paymentDetails.status': 'completed' });

        // Applying pagination
        const startIndex = (page - 1) * entries;
        const endIndex = startIndex + entries;
        const paginatedResult = allNGOs.slice(startIndex, endIndex);

        res.status(200).json(paginatedResult)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

applicationCtrl.GetAllCSRs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const entries = parseInt(req.query.entries) || 10;
    try {
        const allCSRs = await CSR.find({ 'paymentDetails.status': 'completed' });

        // Applying pagination
        const startIndex = (page - 1) * entries;
        const endIndex = startIndex + entries;
        const paginatedResult = allCSRs.slice(startIndex, endIndex);

        res.status(200).json(paginatedResult)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

applicationCtrl.GetAllSEs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const entries = parseInt(req.query.entries) || 10;
    try {

        const allSEs = await SustainableEnterprise.find({ 'paymentDetails.status': 'completed' });

        // Applying pagination
        const startIndex = (page - 1) * entries;
        const endIndex = startIndex + entries;
        const paginatedResult = allSEs.slice(startIndex, endIndex);

        res.status(200).json(paginatedResult)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

applicationCtrl.GetAllSSs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const entries = parseInt(req.query.entries) || 10;
    try {

        const allSSs = await SustainabilityStartup.find({ 'paymentDetails.status': 'completed' });

        // Applying pagination
        const startIndex = (page - 1) * entries;
        const endIndex = startIndex + entries;
        const paginatedResult = allSSs.slice(startIndex, endIndex);

        res.status(200).json(paginatedResult)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

applicationCtrl.GetSingle = async (req, res) => {
    let applicationId = req.params.id;
    const type = req.query.type;

    applicationId = applicationId.trim();

    const isValid = isValidObjectId(applicationId);
    if (!isValid) return res.status(400).json({ msg: "Person UnAuthorized" })

    try {
        let result;

        if (type === "NGO") {
            result = await NGO.findById(applicationId)
        }
        else if (type === "CSR") {
            result = await CSR.findById(applicationId)
        }
        else if (type === "SE") {
            result = await SustainableEnterprise.findById(applicationId)
        }
        else if (type === "SS") {
            result = await SustainabilityStartup.findById(applicationId)
        }

        if (!result) return res.status(404).json({ msg: "Application not found" })

        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" })

    }
}


async function checkPendingPayments() {
    const pendingPayments = await Promise.all([
        NGO.find({ "paymentDetails.status": "pending" }),
        CSR.find({ "paymentDetails.status": "pending" }),
        SustainableEnterprise.find({ "paymentDetails.status": "pending" }),
        SustainabilityStartup.find({ "paymentDetails.status": "pending" })
    ])

    const allPendingPayments = pendingPayments.flat();

    for (const payment of allPendingPayments) {
        const merchantTransactionId = payment.paymentDetails.transactionId;

        if (!merchantTransactionId?.trim()) {
            console.log("No merchantTransactionId")
            continue
        }

        const keyIndex = 1;
        const string = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` + process.env.SALT_KEY;
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
        const checksum = sha256 + "###" + keyIndex;

        const options = {
            method: "GET",
            url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": process.env.MERCHANT_ID,
            },
        };

        try {
            const response = await axios.request(options);
            if (response.data.success === true && response?.data.code === "PAYMENT_SUCCESS") {
                await payment.updateOne({ $set: { "paymentDetails.status": "completed" } });
                console.log(`Payment status updated for ${merchantTransactionId}`);
            }
        } catch (error) {
            console.error(`Failed to check payment status for ${merchantTransactionId}:`, error);
        }
    }
}


cron.schedule("*/2 * * * *", () => {
    console.log("Running scheduled payment check...");
    checkPendingPayments();
});


module.exports = applicationCtrl;