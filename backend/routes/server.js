const express = require("express");
const cors = require("cors");
require("dotenv").config();
const uploadRoute = require("./routes/upload");
const aiRoute = require("./routes/ai");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);
// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Lumina Notes AI Backend is Running!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});