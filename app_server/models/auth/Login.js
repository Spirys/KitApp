const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'Patron'},
    login: String,
    password: String
});

module.exports = mongoose.model('Login', loginSchema);