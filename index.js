// index.js
// where your node app starts

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// enable CORS so FCC can test it remotely
app.use(cors({ optionsSuccessStatus: 200 }));

app.set("trust proxy", true);

// static assets
app.use(express.static("public"));

// root page
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// sample endpoint kept for FCC runner
app.get("/api/hello", (_req, res) => {
  res.json({ greeting: "hello API" });
});

/**
 * Request Header Parser API
 * GET /api/whoami
 * returns { ipaddress, language, software }
 */
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

// listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
