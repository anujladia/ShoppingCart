const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

router.get("/test", (req, res) => res.json({ msg: "In products" }));

// @route   POST api/products/
// @desc    Add products
// @access  Public
router.post("/", (req, res) => {
  Product.findOne({ product_id: req.body.product_id }).then(product => {
    if (product) {
      return res.status(400).json({ product: "Product already exists" });
    } else {
      const newProduct = new Product({
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        price: req.body.price
      });

      newProduct
        .save()
        .then(product => res.json(product))
        .catch(err => console.log(err));
    }
  });
});

// @route   GET api/products/
// @desc    Get all products
// @access  Public
router.get("/", (req, res) => {
  Product.find()
    .sort({ product_name: 1 })
    .then(products => res.json(products))
    .catch(err =>
      res.status(404).json({ noproductsfound: "No products found" })
    );
});

// @route   GET api/products/:product_id
// @desc    Get product with its id
// @access  Public
router.get("/:product_id", (req, res) => {
  Product.findById(req.params.product_id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res
          .status(404)
          .json({ noproductfound: "No product found with that id" });
      }
    })
    .catch(err =>
      res.status(404).json({ noproductfound: "No product found with that id" })
    );
});

module.exports = router;
