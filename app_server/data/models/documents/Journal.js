/*!
 * Journal
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentParent = require('./Document');
const mongoose = require('mongoose');
const virtualSetter = require('../VirtualSetter');

/**
 * A journal model
 */

const journalRawModel = Object.assign({}, DocumentParent.raw, {
    issue: {
        editors: [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
        date: {type: String, required: true}
    },
    cost: Number,
    issn: String,
    keywords: [String],
    articles: [{type: mongoose.Schema.ObjectId, ref: 'Article'}],
    bestseller: {type: Boolean, default: false},
    description: String,
    image: String,
    publisher: String
});

const journalSchema = mongoose.Schema(journalRawModel);
virtualSetter.addId(journalSchema);

/**
 * Module exports a {@link journalSchema} model
 * @type {Model}
 */

module.exports = mongoose.model('Journal', journalSchema);
module.exports.raw = journalRawModel;