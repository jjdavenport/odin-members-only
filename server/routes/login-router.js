const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.post("/", async (req, res) => {});

router.post("/check-email/", authController.getEmailsLogin);

module.exports = router;
