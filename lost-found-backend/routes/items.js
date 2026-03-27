const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const multer = require("multer");

/* =========================
   MULTER CONFIG
========================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* =========================
   REPORT ITEM (LOST / FOUND)
========================= */

router.post("/report", upload.single("image"), async (req, res) => {

  try {

    const { title, description, location, date, phone, type } = req.body;

    // ✅ VALIDATION
    if (!title || !location || !date || !type) {
      return res.status(400).json({
        message: "Title, location, date and type are required"
      });
    }

    if (!["lost", "found"].includes(type)) {
      return res.status(400).json({
        message: "Type must be 'lost' or 'found'"
      });
    }

    const image = req.file ? req.file.filename : "";

    const item = new Item({
      title,
      description,
      location,
      date,
      phone,
      type,
      image,
      status: "open"
    });

    const savedItem = await item.save();

    /* =========================
       MATCHING LOGIC
    ========================= */

    const oppositeType = type === "lost" ? "found" : "lost";

    const match = await Item.findOne({
      title: { $regex: new RegExp(title, "i") },
      type: oppositeType,
      status: "open"
    });

    if (match) {

      return res.status(200).json({
        message: "🎯 Possible match found!",
        matchItem: match,
        newItem: savedItem,
        contactNumbers: {
          reporter: savedItem.phone,
          otherUser: match.phone
        }
      });

    }

    res.status(201).json({
      message: "Item reported successfully",
      item: savedItem
    });

  } catch (error) {

    console.log("REPORT ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});

/* =========================
   GET ALL ITEMS (FILTER SUPPORT)
========================= */

router.get("/items", async (req, res) => {

  try {

    const { type } = req.query;

    let filter = { status: "open" };

    if (type) {
      filter.type = type; // lost / found
    }

    const items = await Item.find(filter)
      .sort({ createdAt: -1 });

    res.json(items);

  } catch (error) {

    console.log("GET ITEMS ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* =========================
   CLAIM ITEM
========================= */

router.put("/claim/:id", async (req, res) => {

  try {

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    if (item.status === "resolved") {
      return res.status(400).json({
        message: "Item already claimed"
      });
    }

    item.status = "resolved";

    await item.save();

    res.json({
      message: "Item claimed successfully",
      item
    });

  } catch (error) {

    console.log("CLAIM ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* =========================
   DASHBOARD STATS
========================= */

router.get("/stats", async (req, res) => {

  try {

    const totalLost = await Item.countDocuments({ type: "lost" });
    const totalFound = await Item.countDocuments({ type: "found" });
    const resolved = await Item.countDocuments({ status: "resolved" });
    const open = await Item.countDocuments({ status: "open" });

    res.json({
      totalLost,
      totalFound,
      resolved,
      open
    });

  } catch (error) {

    console.log("STATS ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;