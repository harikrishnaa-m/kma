const { isValidObjectId } = require("mongoose");
const NGO = require("../models/NGOModel");
const CSR = require("../models/CSRModel");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const axios = require('axios');

const generateMail = require('../utils/NodeMailer.js');
const SustainableEnterprise = require("../models/SEModel.js");
const SustainabilityStartup = require("../models/SSModel.js");

const applicationCtrl = {};

// ID Generate
function generateTransactionId() {
    // Generate a random UUIz
    const uuid = uuidv4();
    const shortUuid = uuid.substring(0, 8);
    const shortUuidUpperCase = shortUuid.toUpperCase();
    const transactionId = `T-${shortUuidUpperCase}`;
    return transactionId;
}

// Create NGO Application;
applicationCtrl.CreateNGO = async (req, res) => {

    const createObj = req.body;

    try {
      
        if (!createObj?.organizationProfile?.name?.trim()) return res.status(400).json({ msg: "Bad Request" })
       
        if (createObj?.paymentDetails?.mode == 'Online') {
            const transactionID = await generateTransactionId();
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = transactionID;
            await newPayment(req, res, createObj)
        } else {
            const newNGOAppln = await NGO.create(createObj);
            res.status(200).json(newNGOAppln);
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
        if (createObj?.paymentDetails?.mode == 'Online') {
            const transactionID = await generateTransactionId();
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = transactionID;
            await newPayment(req, res, createObj)
        } else {
            const newCSRAppln = await CSR.create(createObj);
            res.status(200).json(newCSRAppln);
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

        if (createObj?.paymentDetails?.mode == 'Online') {
            const transactionID = await generateTransactionId();
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = transactionID;
            await newPayment(req, res, createObj)
        } else {
            const newSEAppln = await SustainableEnterprise.create(createObj);
            res.status(200).json(newSEAppln);
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

        if (createObj?.paymentDetails?.mode == 'Online') {
            const transactionID = await generateTransactionId();
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = transactionID;
            await newPayment(req, res, createObj)
        } else {
            const newSSAppln = await SustainabilityStartup.create(createObj);
            res.status(200).json(newSSAppln);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
}



// Payment integration
let finalObj;
const newPayment = async (req, res, obj) => {
    finalObj = obj

    console.log("hi iam hit here")
    console.log(obj)
    try {
        const merchantTransactionId = obj.paymentDetails.transactionId;
        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: obj.paymentDetails.muid,
            name: obj.head,
            amount: obj?.paymentDetails?.amountWithGst * 100,
            redirectUrl: `https://server.kmaaward.qmarkdesk.com/api/application/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            callbackUrl: `https://server.kmaaward.qmarkdesk.com/api/application/status/${merchantTransactionId}`,
            mobileNumber: obj.phone,
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

        axios.request(options).then(function (response) {
            return res.status(201).json(response.data.data.instrumentResponse);
        })
            .catch(function (error) {
                console.error(error);
            });

    } catch (error) {
        console.log(error)
    }
}

applicationCtrl.checkStatus = async (req, res) => {

    const merchantTransactionId = req.params.txnId
    console.log(merchantTransactionId, "checksum check")

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
            'X-MERCHANT-ID': `${process.env.MERCHANT_ID}`
        }
    };

    console.log(finalObj)

    // CHECK PAYMENT STATUS
    axios.request(options).then(async (response) => {
        const email = finalObj?.email
        const transactionID = finalObj?.paymentDetails?.transactionId
        const organization = finalObj?.organization

        if (response.data.success === true && response?.data.code === 'PAYMENT_SUCCESS') {
            let createdDoc;
            if (finalObj?.formName === "NGO") {
                createdDoc = await NGO.create(finalObj);
            }
            else if (finalObj?.formName === "CSR") {
                createdDoc = await CSR.create(finalObj);
            }
            else if (finalObj?.formName === "SE") {
                createdDoc = await SustainableEnterprise.create(finalObj);
            }
            else if (finalObj?.formName === "SS") {
                createdDoc = await SustainabilityStartup.create(finalObj);
            }

            console.log({ createdDoc })
            // After successful payment and database operation, generate and send the email
            await generateMail(email, organization, transactionID).then(() => console.log("Email sent successfully"))
                .catch((error) => console.log("Error sending email:", error));

            // Redirect to success page
            const url = "https://kma.qmarkdesk.com/registration?status=success";
            return res.status(201).redirect(url);
        } else {
            const url = "https://kma.qmarkdesk.com/registration?status=cancel"
            return res.redirect(url)
        }
    })
        .catch((error) => {
            console.log(error)
            const url = "https://kma.qmarkdesk.com/registration?status=fail"
            return res.redirect(url)
        });
};


applicationCtrl.GetAllApplications = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const entries = parseInt(req.query.entries) || 10;
    const searchQuery = req.query.search;

    try {
        let query = {};
        if (searchQuery) {
            query = {
                $or: [
                    { "organizationProfile.name" : { $regex: searchQuery, $options: 'i' } },
                    { "organizationProfile.head" : { $regex: searchQuery, $options: 'i' } },
                    { "organizationProfile.email" : { $regex: searchQuery, $options: 'i' } },
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
        const allNGOs = await NGO.find();

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
        const allCSRs = await CSR.find();

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

        const allSEs = await SustainableEnterprise.find();

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

        const allSSs = await SustainabilityStartup.find();

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

module.exports = applicationCtrl;