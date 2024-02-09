const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { maxAgeAccessCookie, maxAgeRefreshCookie,
    generateAccessToken, generateRefreshToken } = require("../middlewares/tokenMiddlewares.js");
const User = require("../models/UserModel.js");
const authCtrl = {};


// Authentication method for Admin/Employee/Student;
authCtrl.Login = async (req, res) => {
    const name = req.body.name;
    console.log("name", name)

    try {
        // const emailCaseRegex = new RegExp(email, 'i')

        const user = await User.findOne({ name: name }).lean();

        if (!user) {
            return res.status(401).json({ msg: "Invalid name" })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) return res.status(401).json({ msg: "Invalid  password" });


        console.log(isValidPassword)
        const accessToken = generateAccessToken({ userId: user._id, role: user.role })

        const refreshToken = generateRefreshToken({ userId: user._id, role: user.role })

        const { password, ...userInfo } = user;

        res.cookie('access_token', accessToken, { httpOnly: true, sameSite: "strict", secure: true, maxAge: maxAgeAccessCookie });
        res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: "strict", secure: true, maxAge: maxAgeRefreshCookie })

        res.status(200).json(userInfo)

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Something went wrong" })
    }
}

//Regenerate Access Token using Refresh Token;
authCtrl.regenerateAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (typeof refreshToken !== 'string') return res.sendStatus(400);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(400)

        const accessToken = generateAccessToken({ userId: user._id, role: user.role });

        res.cookie("access_token", accessToken, { httpOnly: true, maxAge: maxAgeAccessCookie })

        res.json({ msg: "Access token regenerated" });
    })
}

//Terminate session by deleting tokens in frontend;

authCtrl.Logout = async (req, res) => {

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.sendStatus(204)
}


module.exports = authCtrl;