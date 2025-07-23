const express = require("express");
const router = express.Router();
const { getEmails } = require("../database/query");

router.post("/", async (req, res) => {});

router.post("/check-email/", async (req, res) => {
  const { email } = req.body;
  const emailExists = await getEmails(email);
  res.json({ exists: emailExists });
});

module.exports = router;
