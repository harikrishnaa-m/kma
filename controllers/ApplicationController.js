const { isValidObjectId } = require("mongoose");
const NGO = require("../models/NGOModel");
const CSR = require("../models/CSRModel");
const ESG = require("../models/ESGModel");

const applicationCtrl = {};

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

    try {
        const exist = await NGO.find({ phone });
        const emailExist = await NGO.find({ email });
        console.log(exist, emailExist)
        if (!organization) return res.status(400).json({ msg: "Bad Request" })
        if (exist.length !== 0) return res.status(409).json({ msg: "Phone Number Already Exist" })
        if (emailExist.length !== 0) return res.status(409).json({ msg: "Email Already Exist" })

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
                type: {
                    mode,
                    amount,
                    amountWithGst,
                    ss,
                    transactionId
                },
            }
        }

        let attached = [];

        if (req.files.length > 0) {
            req.files.map((file) => (
                attached.push({ key: file.key, location: file.location })
            ))

            createObj.attachments = attached;
        }
        const newNGOAppln = await NGO.create(createObj);

        res.status(200).json(newNGOAppln);
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

    try {
        const exist = await CSR.find({ phone });
        const emailExist = await CSR.find({ email });
        if (!organization) return res.status(400).json({ msg: "Bad Request" })
        if (exist.length !== 0) return res.status(409).json({ msg: "Phone Number Already Exist" })
        if (emailExist.length !== 0) return res.status(409).json({ msg: "Email Already Exist" })

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
                type: {
                    mode,
                    amount,
                    amountWithGst,
                    ss,
                    transactionId
                },
            }
        }

        let attached = [];

        if (req.files.length > 0) {
            req.files.map((file) => (
                attached.push({ key: file.key, location: file.location })
            ))

            createObj.attachments = attached;
        }
        const newCSRAppln = await CSR.create(createObj);

        res.status(200).json(newCSRAppln);
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

    try {
        const exist = await ESG.find({ phone });
        const emailExist = await ESG.find({ email });
        if (!organization) return res.status(400).json({ msg: "Bad Request" })
        if (exist.length !== 0) return res.status(409).json({ msg: "Phone Number Already Exist" })
        if (emailExist.length !== 0) return res.status(409).json({ msg: "Email Already Exist" })

        let createObj = {
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
            paymentDetails: {
                type: {
                    mode,
                    amount,
                    amountWithGst,
                    ss,
                    transactionId
                },
            }
        }

        let attached = [];

        if (req.files.length > 0) {
            req.files.map((file) => (
                attached.push({ key: file.key, location: file.location })
            ))

            createObj.attachments = attached;
        }
        const newESGAppln = await ESG.create(createObj);

        res.status(200).json(newESGAppln);
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