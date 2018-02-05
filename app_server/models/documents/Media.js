'use strict';
const beautifier = require('../../util/beautifier');
const mongoose = require('mongoose');

/**
 * A schema for a Media material (Audio/Video material)
 * <ul>
 *     <li>name — a name of an AV-material</li>
 *	   <li>authors — authors of an AV-material/li>
 *	   <li>instances — all instances of an AV-material</li>
 * </ul>
 */
const mediaFileSchema = new mongoose.Schema({
    name        :   {type: String, required: true},
    authors     :   [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
    instances   :   {type: mongoose.Schema.ObjectId, ref: 'MediaInstance'}
});

beautifier.virtualId(mediaFileSchema);

module.exports = mongoose.model('MediaFile', mediaFileSchema);
