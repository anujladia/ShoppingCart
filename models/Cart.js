const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  products: [
    {
      product: {
        // this refers to the products collection to link the product data to cart
        type: Schema.Types.ObjectId,
        ref: "products"
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
