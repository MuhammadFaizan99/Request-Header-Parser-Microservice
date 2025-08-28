// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Trust proxy (needed on services like Vercel, Render, etc.)
app.set("trust proxy", true);

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Test endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// ✅ Header Parser endpoint
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
