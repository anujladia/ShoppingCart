const express = require("express");
const router = express.Router();
const csv = require("fast-csv");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

router.get("/test", (req, res) => res.json({ msg: "In Upload" }));

// @route   POST api/upload/
// @desc    Parse CSV file into mongoose
// @access  Public
router.post("/", (req, res) => {
  if (!req.files) {
    return res.status(400).json({ nofile: "No file uploaded" });
  }
  const file = req.files.file;
  let products = [];

  csv
    .fromString(file.data.toString(), {
      headers: true,
      ignoreEmpty: true
    })
    .on("data", data => {
      data["_id"] = new mongoose.Types.ObjectId();
      products.push(data);
    })
    .on("end", () => {
      Product.create(products)
        .then(document => res.json(document))
        .catch(err =>
          res.status(404).json({ erroruploading: "Error uploading the data" })
        );
    });
});

module.exports = router;
