const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.get("/status/", authController.status);
router.post("/admin/", authController.admin);

module.exports = router;
