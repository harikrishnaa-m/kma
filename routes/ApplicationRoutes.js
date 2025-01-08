const router = require("express").Router();
const applicationCtrl = require("../controllers/ApplicationController");
const { adminChecker } = require("../middlewares/adminChecker");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multerToS3");

router.post("/create-csr", upload.array('files'), applicationCtrl.CreateCSR);
router.post("/create-ngo", upload.array('files'), applicationCtrl.CreateNGO);
router.post("/create-se", upload.array('files'), applicationCtrl.CreateSE);
router.post("/create-ss", upload.array('files'), applicationCtrl.CreateSS);

router.get('/status/:txnId', applicationCtrl.checkStatus);

router.use(authMiddleware)
router.use(adminChecker)

router.get("/get-all", applicationCtrl.GetAllApplications);

router.get("/ngo-get-all", applicationCtrl.GetAllNGOs);
router.get("/csr-get-all", applicationCtrl.GetAllCSRs);
router.get("/se-get-all", applicationCtrl.GetAllSEs);
router.get("/ss-get-all", applicationCtrl.GetAllSSs);

router.get("/get-single/:id", applicationCtrl.GetSingle);

module.exports = router;