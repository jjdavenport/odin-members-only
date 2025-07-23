require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login-router");
const registerRouter = require("./routes/register-router");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const distPath = path.join(__dirname, "../client/dist");

app.use(express.static(distPath));

app.use(express.json());

app.get("@", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.use("/api/", indexRouter);
app.use("/api/login/", loginRouter);
app.use("/api/register/", registerRouter);

app.listen(PORT, () => {
  console.log(`listening on http://${HOSTNAME}:${PORT}`);
});
