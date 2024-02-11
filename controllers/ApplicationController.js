const { isValidObjectId } = require("mongoose");
const NGO = require("../models/NGOModel");
const CSR = require("../models/CSRModel");
const ESG = require("../models/ESGModel");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const axios = require('axios');

const generateMail = require('../utils/NodeMailer.js')

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

    const {
        organization,
        address,
        contactPerson,
        email,
        phone,
        website,
        head,
        legalStatus,
        csrNumber,
        mode,
        amount,
        amountWithGst,
        transactionId,
        ss,
    } = req.body;

    console.log(req.body)
    try {
        const exist = await NGO.find({ phone });
        const emailExist = await NGO.find({ email });
        if (!organization) return res.status(400).json({ msg: "Bad Request" })
        if (exist.length !== 0) return res.status(409).json({ msg: "Phone Number Already Exist" })
        if (emailExist.length !== 0) return res.status(409).json({ msg: "Email Already Exist" })

        // create the obj for the payment 
        let createObj = {
            organization,
            address,
            contactPerson,
            email,
            phone,
            website,
            head,
            legalStatus,
            csrNumber,
            paymentDetails: {
                mode,
                amount,
                amountWithGst,
                ss,
                transactionId
            },
            formName: "NGO"
        }

        // File data arranging
        let attached = [];
        if (req.files.length > 0) {
            req.files.map((file) => (
                attached.push({ key: file.key, location: file.location })
            ))
            createObj.attachments = attached;
        }

        // conditionally check this is a online or offline payment
        if (mode == 'Online') {
            console.log("i am enter the Online")
            const transactionID = generateTransactionId();
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = transactionID;
            await newPayment(req, res, createObj)
        } else {
            console.log("i am enter the else")
            const newNGOAppln = await NGO.create(createObj);
            res.status(200).json(newNGOAppln);
        }

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });

    }
}

// Create CSR Application;
applicationCtrl.CreateCSR = async (req, res) => {
    const {
        organization,
        address,
        contactPerson,
        email,
        phone,
        website,
        head,
        orgType,
        orgCategory,
        awardCategory,
        kma_member,
        mode,
        amount,
        amountWithGst,
        transactionId,
        ss,
    } = req.body;
    console.log(req.body)
    try {
        const exist = await CSR.find({ phone });
        const emailExist = await CSR.find({ email });
        if (!organization) return res.status(400).json({ msg: "Bad Request" })
        if (exist.length !== 0) return res.status(409).json({ msg: "Phone Number Already Exist" })
        if (emailExist.length !== 0) return res.status(409).json({ msg: "Email Already Exist" })

        // create the obj for the payment 
        let createObj = {
            organization,
            address,
            contactPerson,
            email,
            phone,
            website,
            head,
            orgType,
            orgCategory,
            awardCategory,
            kma_member,
            paymentDetails: {
                mode,
                amount,
                amountWithGst,
                ss,
                transactionId,
            },
            formName: "CSR"
        }

        // File data arranging
        let attached = [];

        if (req.files.length > 0) {
            req.files.map((file) => (
                attached.push({ key: file.key, location: file.location })
            ))

            createObj.attachments = attached;
        }

        // conditionally check this is a online or offline payment
        if (mode == 'Online') {
            console.log("i am enter the Online")
            const transactionID = generateTransactionId();
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = transactionID;
            await newPayment(req, res, createObj)
        } else {
            console.log("i am enter Else")
            const newCSRAppln = await CSR.create(createObj);
            res.status(200).json(newCSRAppln);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
}

// Create ESG Application;
applicationCtrl.CreateESG = async (req, res) => {
    const {
        organization,
        address,
        contactPerson,
        email,
        phone,
        website,
        head,
        orgType,
        stockExchange,
        kma_member,
        mode,
        amount,
        amountWithGst,
        transactionId,
        ss,
    } = req.body;

    console.log(req.body)

    try {
        const exist = await ESG.find({ phone });
        const emailExist = await ESG.find({ email });
        if (!organization) return res.status(400).json({ msg: "Bad Request" })
        if (exist.length !== 0) return res.status(409).json({ msg: "Phone Number Already Exist" })
        if (emailExist.length !== 0) return res.status(409).json({ msg: "Email Already Exist" })

        // create the obj for the payment 
        let createObj = {
            organization:organization,
            address:address,
            contactPerson,
            email,
            phone,
            website,
            head,
            orgType,
            stockExchange,
            kma_member,
            paymentDetails: {
                mode:mode,
                amount:amount,
                amountWithGst:amountWithGst,
                ss:ss,
                transactionId:transactionId
            },
            formName: "ESG"
        }

        // File data arranging
        let attached = [];

        if (req.files.length > 0) {
            req.files.map((file) => (
                attached.push({ key: file.key, location: file.location })
            ))

            createObj.attachments = attached;
        }

        console.log(createObj)

        // conditionally check this is a online or offline payment
        if (mode == 'Online') {
            console.log("i am enter the Online")
            const transactionID = generateTransactionId();
            createObj.paymentDetails.muid = "MUID" + Date.now();
            createObj.paymentDetails.transactionId = transactionID;
            await newPayment(req, res, createObj)
        } else {
            console.log("i am enter else")
            const newESGAppln = await ESG.create(createObj);
            res.status(200).json(newESGAppln);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" });
    }
}

applicationCtrl.GetAllApplications = async (req, res) => {

    try {
        const allNGOs = await NGO.find();
        const allCSRs = await CSR.find();
        const allESGs = await ESG.find();

        const result = [...allNGOs, ...allCSRs, ...allESGs]

        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

applicationCtrl.GetAllNGOs = async (req, res) => {

    try {
        const allNGOs = await NGO.find();

        res.status(200).json(allNGOs)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

applicationCtrl.GetAllCSRs = async (req, res) => {

    try {
        const allCSRs = await CSR.find();

        res.status(200).json(allCSRs)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

applicationCtrl.GetAllESGs = async (req, res) => {

    try {

        const allESGs = await ESG.find();

        res.status(200).json(allESGs)

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })

    }
}

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
            amount: 1 * 100,
            redirectUrl: `http://localhost:9000/api/application/status/${merchantTransactionId}`,
            redirectMode: 'GET',
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

    // CHECK PAYMENT STATUS
    axios.request(options).then(async (response) => {
        
        if (response.data.success === true) {
             generateMail(finalObj)
            if (finalObj?.formName === "NGO") {
                const response = await NGO.create(finalObj);
                console.log(response)
                console.log(finalObj)
                const url = `https://kma.qmarkdesk.com/registration?status=success`
                // const url = `${process.env.ClientURL}/registration?status=success`
                return res.status(201).redirect(url)

            } else if (finalObj?.formName === "ESG") {
                const response = await ESG.create(finalObj);
                console.log(response)
                console.log(finalObj)
                const url = `https://kma.qmarkdesk.com/registration?status=success`
                // const url = `${process.env.ClientURL}/registration?status=success`
                return res.status(201).redirect(url)
                
            } else if (finalObj?.formName === "CSR") {
               const response =  await CSR.create(finalObj);
               console.log(response)
               console.log(finalObj)
                const url = `https://kma.qmarkdesk.com/registration?status=success`
                // const url = `${process.env.ClientURL}/registration?status=success`
                return res.status(201).redirect(url)
                
            }
        } else {
            const url = `https://kma.qmarkdesk.com//registration?status=cancel`
            // const url = `${process.env.ClientURL}/registration?status=cancel`
            return res.redirect(url)
        }
    })
        .catch((error) => {
            console.log(error)
            const url = `https://kma.qmarkdesk.com//registration?status=fail`
            // const url = `${process.env.ClientURL}/registration?status=fail`
            return res.redirect(url)
        });
};


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

        } else if (type === "CSR") {
            result = await CSR.findById(applicationId)

        } else if (type === "ESG") {
            result = await ESG.findById(applicationId)

        }

        if (!result) return res.status(404).json({ msg: "Application not found" })

        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong" })

    }
}

module.exports = applicationCtrl;