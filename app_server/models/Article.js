'use strict';
const mongoose = require('mongoose');

/**
 *
 */
const articleSchema = new mongoose.Schema({
    name: String,
    authors: [String],
    journal: String
});

module.exports = mongoose.model('Article', articleSchema);