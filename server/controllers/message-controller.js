const { getMessages, getMessageById } = require("../database/query");

exports.getMessages = async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch {
    console.log("error");
  }
};

exports.getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await getMessageById(id);
    res.json(message);
  } catch {
    console.log("error");
  }
};
