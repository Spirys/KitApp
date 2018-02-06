const mongoose = require('mongoose');

/**
 * A schema for a session
 * <ul>
 *     <li>user — user of session</li>
 *     <li>_sessionId — ID of session</li>
 *     <li>expires — expiration time</li>
 * </ul>
 */
const sessionSchema = new mongoose.Schema({
    user        : {type: mongoose.Schema.ObjectId},
    _sessionId  : {type: String, required: true},
    expires     : {type: Number, default: Date.now()}
});

module.exports = mongoose.model('Session', sessionSchema);