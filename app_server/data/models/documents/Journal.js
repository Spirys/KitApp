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

/**
 * A journal model
 */

const journalRawModel = Object.assign({}, DocumentParent.models.raw, {
    issue: {
        editors: [{type:mongoose.Schema.ObjectId, ref:'Author'}],
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
journalSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

/**
 * Module exports a {@link Journal} class
 * @type {Journal}
 */

module.exports.models = {
    raw: journalRawModel,
    mongo: mongoose.model('Journal', journalSchema)
};