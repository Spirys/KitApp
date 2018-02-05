'use strict';
const beautifier    = require('../../util/beautifier');
const mongoose      = require('mongoose');

/**
 *
 * A schema for an article
 * <ul>
 *     <li>title — a title of an article</li>
 *     <li>authors — authors of an article</li>
 * </ul>
 */
const articleSchema = new mongoose.Schema({
    name        : {type: String, required: true},
    authors     : [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
});

beautifier.virtualId(articleSchema);

module.exports = mongoose.model('Article', articleSchema);