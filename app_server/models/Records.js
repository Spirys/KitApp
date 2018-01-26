var mongoose = require('mongoose');

/**
 * A schema for a record
 * <ul>
 *     <li>Book — an ID of the book which is being recorded</li>
 *     <li>Cost — the price for this document</li>
 *     <li>Available — number of available books</li>
 *     <li>Lendings — a list of lendings of the document, including the returned ones</li>
 * </ul>
 */
var recordSchema = new mongoose.Schema({
    book        : String,
    cost        : Number,
    available   : Number,
    lendings    : [documentLendingSchema]
});

/**
 * A schema for a document lending
 * <ul>
 *     <li>Status — can be either <code>true</code> (returned) or <code>false</code> (pending)</li>
 *     <li>Taker — an ID of the person who took this document</li>
 *     <li>Taken — date when this document was taken</li>
 *     <li>Returned — date when this document was returned</li>
 * </ul>
 */
var documentLendingSchema = new mongoose.Schema({
    status    : {type: Boolean, default: false},
    taker     : String,
    taken     : {type: Date, required: true, default: Date.now},
    returned  : {type: Date, default: null}
});

module.exports.documentLending = documentLendingSchema;