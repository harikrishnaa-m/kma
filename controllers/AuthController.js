const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/tokenMiddlewares.js");
const User = require("../models/UserModel.js");
const rateLimit = require('express-rate-limit');
const Joi = require('joi');

const authCtrl = {};

const delayForSecurity = () => new Promise(resolve => setTimeout(resolve, 500));

authCtrl.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 login attempts per window
    message: { msg: "Too many login attempts. Please try again later." },
});

authCtrl.Login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    const { email, password } = value;

    try {
        const escapeRegex = str => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const emailCaseRegex = new RegExp(`^${escapeRegex(email)}$`, 'i');

        const user = await User.findOne({ email: emailCaseRegex }).lean();

        if (!user) {
            await delayForSecurity();
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            await delayForSecurity();
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const accessToken = generateAccessToken({ userId: user._id, role: user.role })

        const refreshToken = generateRefreshToken({ userId: user._id, role: user.role })

        const { password: _, ...userInfo } = user;

        res.status(200).json({ userInfo, accessToken, refreshToken })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Something went wrong" })
    }
}

//Regenerate Access Token using Refresh Token;
authCtrl.regenerateTokens = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (typeof refreshToken !== 'string') return res.status(401).json({ msg: "No refresh token" })

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ msg: "invalid refresh token" })

        const accessToken = generateAccessToken({ userId: user._id, role: user.role });

        const refreshToken = generateRefreshToken({ userId: user._id, role: user.role })

        res.status(200).json({ accessToken, refreshToken });
    })
}

// Logout by deleting tokens in frontend;


module.exports = authCtrl;