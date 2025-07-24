const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.get("/status/", authController.status);

module.exports = router;
