'use strict';
const beautifier    = require('../util/beautifier');
const mongoose      = require('mongoose');

/**
 *
 */
const journalSchema = new mongoose.Schema({
    name            :   {type: String, required: true},
    publisher       :   String,
    issue: {
        editors     :   [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
        date        :   {type: Date, required: true, default: Date.now}
    },
    articles        :   [{type: mongoose.Schema.ObjectId, ref: 'Article'}],
    instances       :   {type: mongoose.Schema.ObjectId, ref: 'JournalInstance'}
});

beautifier.virtualId(journalSchema);

module.exports = mongoose.model('Journal', journalSchema);