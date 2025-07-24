const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.post("/", authController.register);

router.post("/check-email/", authController.getEmailsRegister);

module.exports = router;
