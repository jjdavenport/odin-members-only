const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { registerUser } = require("../database/query");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    if (!email | !firstName | !lastName | !password | !confirmPassword) {
      res.status(400).json({
        success: false,
        message:
          "email, fist name, last name, password, confirm password required",
      });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    await registerUser(email, firstName, lastName, hashedPassword);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
    return next(error);
  }
});

router.post("/check-email/", authController.getEmailsRegister);

module.exports = router;
