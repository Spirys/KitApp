const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    userId: String,
    _sessionId: String,
    expires: Number
});