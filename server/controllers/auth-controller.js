const { getEmails } = require("../database/query");

exports.getEmailsLogin = async (req, res) => {
  const { email } = req.body;
  const emailExists = await getEmails(email);
  res.json({ exists: emailExists });
};

exports.getEmailsRegister = async (req, res) => {
  const { email } = req.body;
  const emailExists = await getEmails(email);
  res.json({ available: !emailExists });
};
