'use strict';
const beautifier = require('../util/beautifier');
const mongoose = require('mongoose');

/**
 *
 */
const mediaFileSchema = new mongoose.Schema({
    name        :   {type: String, required: true},
    authors     :   [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
    instances   :   {type: mongoose.Schema.ObjectId, ref: 'MediaInstance'}
});

beautifier.virtualId(mediaFileSchema);

module.exports = mongoose.model('MediaFile', mediaFileSchema);
