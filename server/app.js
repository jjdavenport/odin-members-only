require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
const session = require("express-session");
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login-router");
const registerRouter = require("./routes/register-router");
const authRouter = require("./routes/auth-router");
const adminRouter = require("./routes/admin-router");
const authenticate = require("./middleware/authenticate");
require("./passport-config");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const distPath = path.join(__dirname, "../client/dist");

app.use(express.static(distPath));

app.use(session({ secret: "cats", saveUninitialized: false, resave: false }));
app.use(passport.session());
app.use(express.json());

app.get("@", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.use("/api/", indexRouter);
app.use("/api/login/", loginRouter);
app.use("/api/register/", registerRouter);

app.use(authenticate);

app.use("/api/auth/", authRouter);
app.use("/api/admin/", adminRouter);

app.listen(PORT, () => {
  console.log(`listening on http://${HOSTNAME}:${PORT}`);
});
