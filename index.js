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

app.set("trust proxy", true);

function getClientIp(req) {
  // Priority: explicit CDN/Proxy headers → XFF chain → fallback to socket
  const cf = req.headers["cf-connecting-ip"];
  const fly = req.headers["fly-client-ip"];
  const real = req.headers["x-real-ip"];

  const xff = req.headers["x-forwarded-for"];
  if (cf) return cf;
  if (fly) return fly;
  if (real) return real;

  if (xff) {
    // XFF can be a list: client, proxy1, proxy2, ...
    const first = xff.split(",")[0].trim();
    if (first) return first;
  }
  // Fallback (may be IPv6 like ::1 or a proxy IP)
  return req.ip || req.socket?.remoteAddress || "";
}

/**
 * Request Header Parser API
 * GET /api/whoami
 * returns { ipaddress, language, software }
 */
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: getClientIp(req),
    language: req.headers["accept-language"] || "",
    software: req.headers["user-agent"] || ""
  });
});

// listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
