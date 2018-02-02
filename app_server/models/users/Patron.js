'use strict';
const beautifier    = require('../../util/beautifier.js');
const config        = require('../../config/config');
const mongoose      = require('mongoose');

/**
 * A schema for a user
 * <ul>
 *     <li>first_name — the first name of the user</li>
 *     <li></li>
 *     <li></li>
 *     <li></li>
 *     <li></li>
 *     <li>Occupation — the additional information about occupation.</li>
 *     <li>Patron type — the type of the user.</li>
 *     <li>About — the additional information about the user.</li>
 * </ul>
 */
const userSchema = new mongoose.Schema({
    first_name      :   {type: String, required: true},
    last_name       :   {type: String, required: true},
    dateOfBirth     :   {type: Date, required: true},
    phone           :   Number,
    occupation      :   String,
    patronType      :   {type: String, enum: config.patronTypes, required: true},
    about: String,
    avatar: {type: String, default: config.defaultUserImage}
});

userSchema.virtual('name').get(function () {
    return this.first_name + ' ' + this.last_name;
});

beautifier.virtualId(userSchema);

module.exports = mongoose.model('Patron', userSchema);