const mongoose = require('mongoose');
const beautifier = require('../../util/beautifier');

const loginSchema = new mongoose.Schema({
    user    : {type: mongoose.Schema.ObjectId, ref: 'Patron'},
    login   : String,
    password: String
});

beautifier.virtualId(loginSchema);

module.exports = mongoose.model('Login', loginSchema);