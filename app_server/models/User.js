const mongoose = require('mongoose');
const perm = require('permissions');

/**
 * A schema for a user
 * <ul>
 *     <li>id — the unique ID of the user</li>
 *     <li></li>
 *     <li></li>
 *     <li></li>
 *     <li></li>
 *     <li>Occupation — the additional information about occupation.</li>
 *     <li>User type — the type of the user. Can be either "STUDENT" or "FACULTY"</li>
 * </ul>
 */
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    surname: String,
    dateOfBirth: Date,
    phone: Number,
    occupation: String,
    userType: String
});

module.exports = mongoose.model('User', userSchema);