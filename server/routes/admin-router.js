const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.delete("/delete-message/:id", authController.deleteMessage);

module.exports = router;
