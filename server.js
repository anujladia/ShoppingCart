const express = require("express");
const monogoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");

const products = require("./routes/api/products");
const cart = require("./routes/api/cart");
const upload = require("./routes/api/upload");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// File Upload
app.use(fileUpload());

// DB configuration
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
monogoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//app.get("/", (req, res) => res.send("Hello!"));

// Use Routes
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/upload", upload);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
