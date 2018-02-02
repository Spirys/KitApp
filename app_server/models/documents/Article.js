'use strict';
const beautifier    = require('../../util/beautifier');
const mongoose      = require('mongoose');

/**
 *
 */
const articleSchema = new mongoose.Schema({
    name        : {type: String, required: true},
    authors     : [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
    // journal     : {type: mongoose.Schema.ObjectId, ref: 'Journal'}
});

beautifier.virtualId(articleSchema);

module.exports = mongoose.model('Article', articleSchema);