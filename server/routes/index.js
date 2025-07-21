const express = require("express");
const router = express.Router();
const { getMessages } = require("../database/query");

router.get("/get-messages/", async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch {
    console.log("error");
  }
});

module.exports = router;
