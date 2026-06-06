const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller")

authRouter.post("/register", authController.registerUserController);
authRouter.post("/api/auth/login", authController.loginUserController);

module.exports = authRouter;