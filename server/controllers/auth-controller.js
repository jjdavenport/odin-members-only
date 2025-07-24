const { getEmails, registerUser } = require("../database/query");
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
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
};
