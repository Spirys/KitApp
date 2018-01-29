'use strict';
const mongoose = require('mongoose');
const beautifier = require('../util/beautifier');

/**
 * A schema for a book
 * <ul>
 *     <li>Title — a title of a book</li>
 * </ul>
 */
const bookSchema = new mongoose.Schema({
    title       : {type: String, required: true},
    authors     : [{type: mongoose.Schema.ObjectId, ref: 'Author', required: true}],
    cost        : {type: Number, default: 0},
    description : String,
    edition     : String,
    ISBN        : String,
    publisher   : String,
    published   : Date,
    instances   : [{type: mongoose.Schema.ObjectId, ref: 'BookInstance'}]
});

beautifier.virtualId(bookSchema);

module.exports = mongoose.model('Book', bookSchema);