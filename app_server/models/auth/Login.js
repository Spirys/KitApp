const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    userId: String,
    login: String,
    password: String
});