const express = require("express");
const router = express.Router();
const { getMessages, getMessageById } = require("../database/query");

router.get("/get-messages/", async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch {
    console.log("error");
  }
});

router.get("/message/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const message = await getMessageById(id);
    res.json(message);
  } catch {
    console.log("error");
  }
});

module.exports = router;
