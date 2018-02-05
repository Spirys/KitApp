'use strict';
const beautifier    = require('../../util/beautifier');
const mongoose      = require('mongoose');

/**
 * Defining the model for journals
 *     <li>title — a status of a journal</li>
 *	   <li>publisher — a publisher of journal</li>
 *	   <li>issue — an isuue of journal</li>
 *	   <li>articles — articles included to journal</li>
 *	   <li>instances — all instances of a journal</li>
 */
const journalSchema = new mongoose.Schema({
    title           :   {type: String, required: true},
    publisher       :   {type: String, required: true},
    issue: {
        editors     :   {type: [mongoose.Schema.ObjectId], ref: 'Author', required: true},
        date        :   {type: Date, required: true, default: Date.now}
    },
    articles        :   [{type: mongoose.Schema.ObjectId, ref: 'Article'}],
    instances       :   {type: mongoose.Schema.ObjectId, ref: 'JournalInstance'}
});

beautifier.virtualId(journalSchema);

module.exports = mongoose.model('Journal', journalSchema);