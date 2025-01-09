const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/AuthController")

router.post("/login", authCtrl.loginLimiter, authCtrl.Login);
router.get("/refresh-token", authCtrl.regenerateTokens);

module.exports = router;