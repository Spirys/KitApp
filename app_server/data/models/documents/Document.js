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
const virtualSetter = require('../VirtualSetter');

/**
 * Model of the document. May be used as-is
 * @private
 */

const documentRawModel = {
    title: {type: String, required: true},
    instances: [{type: mongoose.Schema.ObjectId, ref: 'DocumentInstance'}]
};

const documentSchema = mongoose.Schema(documentRawModel);
virtualSetter.addId(documentSchema);

/**
 * Module exports a {@link documentSchema} model
 * @type {Model}
 */

module.exports = mongoose.model('Document', documentSchema);
module.exports.raw = documentRawModel;