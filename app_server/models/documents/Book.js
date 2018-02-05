'use strict';
const mongoose      = require('mongoose');
const beautifier    = require('../../util/beautifier');
const noImage       = require('../../config/config').noImage;

/**
 * A schema for a book
 * <ul>
 *     <li>title — a title of a book</li>
 *     <li>authors — authors of a book</li>
 *     <li>cost — a cost of a book</li>
 *     <li>description — a description (annotation) of a book</li>
 *     <li>edition — an edition of a book</li>
 *     <li>ISBN — an ISBN (International Standard Book Number) of a book</li>
 *     <li>image — a image (cover) of a book</li>
 *     <li>keywords — keywords of a book</li>
 *     <li>publisher — a name of book publisher</li>
 *     <li>published — a date of book publishing</li>
 *     <li>instances — all instances of a book</li>
 * </ul>
 */
const bookSchema = new mongoose.Schema({
    title       : {type: String, required: true},
    authors     : [{type: mongoose.Schema.ObjectId, ref: 'Author', required: true}],
    cost        : {type: Number, required: true, default: 0},
    description : String,
    edition     : {type: String, required: true},
    ISBN        : String,
    image       : {type: String, default: noImage},
    keywords    : {type: String, required: true},
    publisher   : String,
    published   : Date,
    instances   : [{type: mongoose.Schema.ObjectId, ref: 'BookInstance'}]
});

beautifier.virtualId(bookSchema);

module.exports = mongoose.model('Book', bookSchema);