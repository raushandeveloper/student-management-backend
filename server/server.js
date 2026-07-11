const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// fallback (open index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});