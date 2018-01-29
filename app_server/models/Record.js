'use strict';
const mongoose = require('mongoose');

/**
 * A schema for a record
 * <ul>
 *     <li>Document — an ID of the document instance which is being recorded</li>
 *     <li>Lendings — a list of lendings of the document, including the returned ones</li>
 *     <li>Taker — an ID of the patron who took this document</li>
 *     <li>Taken — date when this document was taken</li>
 *     <li>Returned — date when this document was returned</li>
 * </ul>
 */
const recordSchema = new mongoose.Schema({
    document    : mongoose.Schema.ObjectId,
    taker       : {type: mongoose.Schema.ObjectId, ref: 'Patron', required: true},
    taken       : {type: Date, required: true, default: Date.now},
    returned    : {type: Date, default: null}
});

/**
 * A function which calculates fine
 */
recordSchema.virtual('fine').get(function () {
    // TODO 29.01.2018 Write fine calculation
    return 0;
});

module.exports = mongoose.model('Record', recordSchema);