const router = require("express").Router();
const applicationCtrl = require("../controllers/ApplicationController");
const { upload } = require("../middlewares/multerToS3");

router.post("/create-csr", upload.array('files'), applicationCtrl.CreateCSR);
router.post("/create-esg", upload.array('files'), applicationCtrl.CreateESG);
router.post("/create-ngo", upload.array('files'), applicationCtrl.CreateNGO);

router.get('/status/:txnId', applicationCtrl.checkStatus);

router.get("/get-all", applicationCtrl.GetAllApplications);

router.get("/ngo-get-all", applicationCtrl.GetAllNGOs);
router.get("/csr-get-all", applicationCtrl.GetAllCSRs);
router.get("/esg-get-all", applicationCtrl.GetAllESGs);

router.get("/get-single/:id", applicationCtrl.GetSingle);

module.exports = router;