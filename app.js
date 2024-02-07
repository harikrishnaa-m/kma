const express = require("express");
const ConnectDB = require("./db");
require("dotenv").config()
const app = express();
const authRouter = require("./routes/AuthRoutes")
const applicationRouter = require("./routes/ApplicationRoutes")

ConnectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/auth", authRouter);
app.use("/api/application", applicationRouter)


app.listen(9000,()=>{
    console.log("Server running successfully")
})