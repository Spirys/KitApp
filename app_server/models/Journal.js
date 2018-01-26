'use strict';

const mongoose = require('mongoose');
const records = require('../../app_server/models/Records');
const articleSchema = require('../../app_server/models/Article');

/**
 *
 */
const issueSchema = new mongoose.Schema({
    editors     : [String],
    date        : Date
});

/**
 *
 */
const journalSchema = new mongoose.Schema({
    name: String,
    publisher: String,
    issue: issueSchema,
    articles: {type: [articleSchema], ref: 'Article'},
    lendings: [records.documentLending]
});

module.exports = mongoose.model('Journal', journalSchema);