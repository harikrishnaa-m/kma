const router = require("express").Router();
const applicationCtrl = require("../controllers/ApplicationController");
const { adminChecker } = require("../middlewares/adminChecker");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multerToS3");
// const { CSRIV, NGOIV, SEIV, SSIV } = require("../middlewares/validators");

router.post("/create-csr", applicationCtrl.CreateCSR);
router.post("/create-ngo", applicationCtrl.CreateNGO);
router.post("/create-se", applicationCtrl.CreateSE);
router.post("/create-ss", applicationCtrl.CreateSS);
router.post("/create-si", applicationCtrl.CreateSI);
router.post("/create-gcc", applicationCtrl.CreateGCC);

router.get("/status/:txnId", applicationCtrl.checkStatus);

router.use(authMiddleware);
router.use(adminChecker);

router.get("/get-all", applicationCtrl.GetAllApplications);

router.get("/ngo-get-all", applicationCtrl.GetAllNGOs);
router.get("/csr-get-all", applicationCtrl.GetAllCSRs);
router.get("/se-get-all", applicationCtrl.GetAllSEs);
router.get("/ss-get-all", applicationCtrl.GetAllSSs);
router.get("/si-get-all", applicationCtrl.GetAllSIs);
router.get("/gcc-get-all", applicationCtrl.GetAllGCCs);

router.get("/get-single/:id", applicationCtrl.GetSingle);

module.exports = router;
