'use strict';
const beautifier    = require('../../util/beautifier.js');
const config        = require('../../config/config');
const mongoose      = require('mongoose');

/**
 * A schema for a user
 * <ul>
 *     <li>first_name — the first name of the user</li>
 *     <li>last_name — the last name of the user</li>
 *     <li>birth_date — the date of birth of the user</li>
 *     <li>phone — phone number of the user</li>
 *     <li>occupation — additional information about occupation</li>
 *     <li>patron_type — the type of patron</li>
 *     <li>avatar — the avatar (profile photo) of the user</li>
 *     <li>about — additional information about user</li>
 *     <li>contacts — contacts (telegram alias, e-mail) of the user</li>
 * </ul>
 */
const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birth_date: {type: Date, required: true},
    phone: Number,
    occupation: String,
    patron_type: {type: String, enum: config.patronTypes, required: true},
    about: String,
    avatar: {type: String, default: config.defaultUserImage}
});

userSchema.virtual('name').get(function () {
    return this.first_name + ' ' + this.last_name;
});

userSchema.virtual('patron').get(function () {
    return true;
});

beautifier.virtualId(userSchema);

module.exports = mongoose.model('Patron', userSchema);