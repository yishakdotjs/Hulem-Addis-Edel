const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/users");
const Product = require("./models/products");

// App Config
const app = express();
dotEnv.config();
const port = process.env.PORT;

// DB Config
mongoose.connect('mongodb://127.0.0.1:27017/hulem_addis');

// View Engine Setup
app.set("views", "views");
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));

// Routes
app.get('/products', async function (req, res) {
    const chatId = req.query.chatId;
    const user = await User.findOne({ chatId: chatId });

    if (!user) {
        return res.send("Something went wrong. Please try again later.")
    }

    const products = await Product.find({});

    const context = {
        firstName: user.firstName,
        products: products,
        chatId: chatId
    }

    return res.render("products.ejs", context);
})

app.get("/bid", async function (req, res) {
    const chatId = req.query.chatId
    const productId = req.query.productId
})

app.listen(port, () => console.log("Listening on port " + port));