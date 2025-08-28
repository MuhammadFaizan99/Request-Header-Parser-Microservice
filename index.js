// index.js
// where your node app starts

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Let Express trust proxy headers (so req.ip works on Vercel/Render/Heroku)
app.set("trust proxy", true);

// enable CORS for FCC tests
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static("public"));

// landing page
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// sample endpoint (kept for FCC runner compatibility)
app.get("/api/hello", (_req, res) => {
  res.json({ greeting: "hello API" });
});

// === Your API endpoint ===
app.get("/api/whoami", (req, res) => {
  // Prefer X-Forwarded-For (first IP) when behind proxies
  const xff = req.headers["x-forwarded-for"];
  const ip =
    (typeof xff === "string" && xff.split(",")[0].trim()) ||
    req.ip || // Express computed
    req.socket?.remoteAddress ||
    "";

  res.json({
    ipaddress: ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

// start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
