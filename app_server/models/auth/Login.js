const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    userId: Number,
    login: String,
    password: String
});