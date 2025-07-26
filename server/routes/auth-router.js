const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authenticate = require("../middleware/authenticate");

router.get("/status/", authController.status);
router.post("/admin/", authController.admin);
router.post("/new-message/", authenticate, authController.newMessage);

module.exports = router;
