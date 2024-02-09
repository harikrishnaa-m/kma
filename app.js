const express = require("express");
const ConnectDB = require("./db");
const CookieParser = require("cookie-parser");
require("dotenv").config()
const app = express();
const authRouter = require("./routes/AuthRoutes")
const applicationRouter = require("./routes/ApplicationRoutes");
const cors = require('cors');
const bodyParser = require('body-parser')

const ClientURL = process.env.ClientURL;

ConnectDB()
app.use(cors({
    origin: ClientURL,
    credentials: true,
}));

app.use(CookieParser())
// app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter);
app.use("/api/application", applicationRouter)

app.listen(9000, () => {
    console.log("Server running successfully")
})