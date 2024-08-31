const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: String,
    image: String,
    bidPrice: Number,
    maxNumberOfBids: Number
})

module.exports = mongoose.model("Product", schema);