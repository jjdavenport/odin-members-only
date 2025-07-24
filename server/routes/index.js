const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message-controller");
const authController = require("../controllers/auth-controller");

router.get("/get-messages/", messageController.getMessages);

router.get("/message/:id", messageController.getMessageById);

router.post("/logout/", authController.logout);

module.exports = router;
