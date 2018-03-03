/*!
 * An abstraction of a document
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentInstance = require('./DocumentInstance');
const mongoose = require('mongoose');

/**
 * Model of the document. May be used as-is
 * @private
 */

const documentRawModel = {
    title: {type: String, required: true},
    instances: [{type: mongoose.Schema.ObjectId, ref: 'Instance'}]
};

const documentSchema = mongoose.Schema(documentRawModel);
documentSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

/**
 * Module exports a class {@link Document}
 * @type {Document}
 * @public
 */

module.exports.models = {
    raw: documentRawModel,
    mongo: mongoose.model('Document', documentSchema)
};