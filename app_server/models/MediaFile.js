var mongoose = require('mongoose');
var records = require('../../app_server/models/Records');

/**
 *
 */
var mediaFileSchema = new mongoose.Schema({
    name        : String,
    authors     : [String],
    lendings    : [records.documentLending]
});

module.exports = mongoose.model('MediaFile', mediaFileSchema);
