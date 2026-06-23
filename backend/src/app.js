require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ credentials: true, origin: clientUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
