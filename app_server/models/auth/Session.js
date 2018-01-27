const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    userId: Number,
    _sessionId: String,
    expires: Number
});