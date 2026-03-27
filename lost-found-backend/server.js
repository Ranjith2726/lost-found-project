const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* Import Routes */
const itemRoutes = require("./routes/items");   // ✅ FIXED (plural)
const authRoutes = require("./routes/auth");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* Serve uploaded images */
app.use("/uploads", express.static("uploads"));

/* =========================
   TEST ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("🚀 Lost & Found API running");
});

app.get("/api", (req, res) => {
  res.send("✅ API is working");
});

/* =========================
   API ROUTES
========================= */

// 🔐 Auth routes
app.use("/api/auth", authRoutes);

// 📦 Item routes
app.use("/api/items", itemRoutes);

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("✅ MongoDB Connected Successfully");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

})
.catch((error) => {
  console.error("❌ MongoDB Connection Error:", error.message);
});