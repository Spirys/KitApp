const mongoose = require("mongoose");
const beautifier = require('../util/beautifier');

const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId},
    _sessionId: {type: String, required: true},
    expires: {type: Number, default: Date.now()}
});

module.exports = mongoose.model('Session', sessionSchema);