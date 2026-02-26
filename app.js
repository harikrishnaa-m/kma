const express = require("express");
const ConnectDB = require("./db");
const CookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const authRouter = require("./routes/AuthRoutes");
const applicationRouter = require("./routes/ApplicationRoutes");
const uploadsRouter = require("./routes/uploads");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const cron = require("node-cron");
const {
  reconcilePendingPayments,
} = require("./controllers/ApplicationController");

const ClientURL = process.env.ClientURL;

ConnectDB();

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      const allowedOrigins = [ClientURL];

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    }
  },
};

app.use(cors(corsOptions));

app.use(CookieParser());
// app.use(express.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

const logRequests = (req, res, next) => {
  logger.info({
    // timestamp: new Date().toISOString(),
    // method: req.method,
    // url: req.originalUrl,
    body: req.body,
    headers: req.headers,
  });
  next();
};

app.use(
  [
    "/api/application/create-csr",
    "/api/application/create-ngo",
    "/api/application/create-se",
    "/api/application/create-ss",
  ],
  logRequests,
);

app.use("/api/auth", authRouter);
app.use("/api/application", applicationRouter);
app.use("/api/uploads", uploadsRouter);

cron.schedule("*/3 * * * *", async () => {
  console.log("Running scheduled payment reconciliation...");
  await reconcilePendingPayments();
});
app.listen(8080, () => {
  console.log("Server running successfully");
});
