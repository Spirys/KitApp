'use strict';

const mongoose = require('mongoose');
const records = require('../../app_server/models/Records');

/**
 * A schema for a book
 * <ul>
 *     <li>id — the unique ID of a book</li>
 *     <li>Name — a name of a book</li>
 * </ul>
 */
const bookSchema = new mongoose.Schema({
    id: Number,
    title: String,
    authors: [String],
    publisher: String,
    edition: String,
    year: Date,
    ISBN: String,
    description: String,
    lendings: [records.documentLending]
});

module.exports = mongoose.model('Book', bookSchema);