require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const distPath = path.join(__dirname, "../client/dist");

app.use(express.static(distPath));

app.get("@", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on http://${HOSTNAME}:${PORT}`);
});
