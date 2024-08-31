const mongoose = require("mongoose");

const schema = mongoose.Schema({
    chatId: String,
    firstName: String
})

module.exports = mongoose.model("User", schema);