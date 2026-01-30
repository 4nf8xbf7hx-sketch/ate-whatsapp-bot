const express = require("express");
const app = express();

const VERIFY_TOKEN = "ate123";

// Root-Test
app.get("/", (req, res) => {
  res.send("Bot läuft");
});

// Webhook-Verifizierung (SEHR WICHTIG)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verifiziert");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Render PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server läuft auf Port", PORT);
});
