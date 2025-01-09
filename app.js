const express = require("express");
const ConnectDB = require("./db");
const CookieParser = require("cookie-parser");
require("dotenv").config()
const app = express();
const authRouter = require("./routes/AuthRoutes")
const applicationRouter = require("./routes/ApplicationRoutes");
const uploadsRouter = require("./routes/uploads");
const cors = require('cors');
const bodyParser = require('body-parser')

const ClientURL = process.env.ClientURL;
const ClientURL2 = process.env.ClientURL2;

ConnectDB()
// app.use(cors({
//     origin: ClientURL,
//     credentials: true,
// }));

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || process.env.NODE_ENV === 'development') {
            callback(null, true);

        } else {
            const allowedOrigins = [ClientURL, ClientURL2];

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Origin not allowed by CORS'));
            }
        }
    }
};

app.use(cors(corsOptions));

app.use(CookieParser())
// app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter);
app.use("/api/application", applicationRouter)
app.use("/api/uploads", uploadsRouter)

app.listen(8080, () => {
    console.log("Server running successfully")
})