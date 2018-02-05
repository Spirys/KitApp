'use strict';
const beautifier = require('../../util/beautifier.js');
const config = require('../../config/config');
const mongoose = require('mongoose');

/**
 * A schema for a librarian
 * <ul>
 *     <li>first_name — the first name of the librarian</li>
 *     <li>last_name — the last name of the librarian</li>
 *     <li>birth_date — the date of birth of the librarian</li>
 *     <li>avatar — the avatar (profile photo) of the librarian</li>
 *     <li>contacts — contacts (telegram alias, e-mail) of the librarian</li>
 *     <li>phone — phone number of the librarian</li>
 * </ul>
 */
const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birth_date: {type: Date, required: true},
    avatar: {type: String, default: config.defaultUserImage},
    contacts: String,
    phone: Number
});

userSchema.virtual('name').get(function () {
    return this.first_name + ' ' + this.last_name;
});

userSchema.virtual('librarian').get(function () {
    return true;
});

beautifier.virtualId(userSchema);

module.exports = mongoose.model('Librarian', userSchema);