const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

router.get("/test", (req, res) => res.json({ msg: "In Cart" }));

// @route   GET api/cart/:cart_id
// @desc    Get details of the cart
// @access  Public
router.get("/:cart_id", (req, res) => {
  Cart.findById(req.params.cart_id)
    .populate("products.product", ["product_name", "price"])
    .then(cart => {
      if (cart.length === 0) {
        res.status(404).json({ nocartfound: "No cart found by this id" });
      }
      res.json(cart);
    })
    .catch(err =>
      res.status(404).json({ nocartfound: "No cart found by this id" })
    );
});

// @route   POST api/cart/create_cart
// @desc    Create a new Cart
// @access  Public
router.post("/create_cart", (req, res) => {
  const cart = new Cart();
  cart
    .save()
    .then(newCart => res.json(newCart))
    .catch(err => console.log(err));
});

// @route   POST api/cart/:product_id/:cart_id
// @desc    Add items in the cart
// @access  Public
router.post("/:product_id/:cart_id", (req, res) => {
  Product.findById(req.params.product_id)
    .then(product => {
      if (product) {
        Cart.findById(req.params.cart_id)
          .then(cart => {
            // Get index of the same product if it is in the cart
            const index = cart.products
              .map(product => product.product.toString())
              .indexOf(req.params.product_id);

            // Checking if product is in the cart or not
            if (index === -1) {
              const newProduct = {
                product: req.params.product_id,
                quantity: 1
              };

              // Add product to the front of the products array
              cart.products.unshift(newProduct);

              cart
                .save()
                .then(cart => {
                  Cart.findById(cart._id)
                    .populate("products.product", ["product_name", "price"])
                    .then(cart => {
                      if (cart.length === 0) {
                        res
                          .status(404)
                          .json({ nocartfound: "No cart found by this id" });
                      }
                      res.json(cart);
                    })
                    .catch(err =>
                      res
                        .status(404)
                        .json({ nocartfound: "No cart found by this id" })
                    );
                })
                .catch(err => console.log(err));
            } else {
              cart.products[index].quantity += 1;
              cart
                .save()
                .then(cart => {
                  Cart.findById(cart._id)
                    .populate("products.product", ["product_name", "price"])
                    .then(cart => {
                      if (cart.length === 0) {
                        res
                          .status(404)
                          .json({ nocartfound: "No cart found by this id" });
                      }
                      res.json(cart);
                    })
                    .catch(err =>
                      res
                        .status(404)
                        .json({ nocartfound: "No cart found by this id" })
                    );
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err =>
            res.status(404).json({ cartnotfound: "No cart found" })
          );
      } else {
        res
          .status(404)
          .json({ noproductfound: "No product found to add in cart" });
      }
    })
    .catch(err => {
      res.status(404).json({ noproductfound: "No product found" });
    });
});

// @route   POST api/cart/:product_id/:cart_id
// @desc    Remove item in the cart
// @access  Public
router.delete("/:product_id/:cart_id", (req, res) => {
  Cart.findById(req.params.cart_id)
    .then(cart => {
      const index = cart.products
        .map(product => product.product.toString())
        .indexOf(req.params.product_id);

      if (index === -1) {
        res
          .status(404)
          .json({ noproductfound: "No product found in the cart" });
      } else {
        const quantity = cart.products[index].quantity;
        if (quantity === 1) {
          cart.products.splice(index, 1);
          cart
            .save()
            .then(cart => {
              Cart.findById(cart._id)
                .populate("products.product", ["product_name", "price"])
                .then(cart => {
                  if (cart.length === 0) {
                    res
                      .status(404)
                      .json({ nocartfound: "No cart found by this id" });
                  }
                  res.json(cart);
                })
                .catch(err =>
                  res
                    .status(404)
                    .json({ nocartfound: "No cart found by this id" })
                );
            })
            .catch(err => console.log(err));
        } else {
          cart.products[index].quantity -= 1;
          cart
            .save()
            .then(cart => {
              Cart.findById(cart._id)
                .populate("products.product", ["product_name", "price"])
                .then(cart => {
                  if (cart.length === 0) {
                    res
                      .status(404)
                      .json({ nocartfound: "No cart found by this id" });
                  }
                  res.json(cart);
                })
                .catch(err =>
                  res
                    .status(404)
                    .json({ nocartfound: "No cart found by this id" })
                );
            })
            .catch(err => console.log(err));
        }
      }
    })
    .catch(err =>
      res.status(404).json({ noproductfound: "No product found in the cart" })
    );
});

module.exports = router;
