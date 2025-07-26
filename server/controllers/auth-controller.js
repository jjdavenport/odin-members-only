require("dotenv").config();
const {
  getEmails,
  registerUser,
  deleteMessageById,
} = require("../database/query");
const bcrypt = require("bcrypt");
const passport = require("passport");

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

exports.register = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    if (!email | !firstName | !lastName | !password | !confirmPassword) {
      res.status(400).json({
        success: false,
        message:
          "email, fist name, last name, password, confirm password required",
      });
    }
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "password and confirm password must match",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await registerUser(email, firstName, lastName, hashedPassword);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ success: true, message: "logged in" });
    });
  })(req, res, next);
};

exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.json({ success: true, message: "logged out" });
};

exports.status = async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      loggedIn: true,
      email: req.user,
      admin: req.admin,
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
};

exports.admin = async (req, res) => {
  try {
    const { passcode } = req.body;
    if (passcode === process.env.PASSCODE) {
      return res
        .status(200)
        .json({ success: true, message: "correct passcode" });
    }
    return res.status(401).json({ success: false, message: "wrong passcode" });
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};

exports.newMessage = async (req, res) => {
  const { title, message } = req.body;
  await newMessage(title, message);
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteMessageById(id);
    return res.status(200).json({ success: true, message: "deleted message" });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: "failed to delete" });
  }
};
