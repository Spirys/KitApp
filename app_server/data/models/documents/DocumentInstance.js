/*!
 * A basic implementation of a document instance
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');
const virtualSetter = require('../VirtualSetter');

/**
 * Model of the document instance. May be used as-is
 * @private
 */

const documentInstanceRawModel = {
    status: {type: String, required: true},
    taker: {type: mongoose.Schema.ObjectId, ref: 'Patron'},
    document: {
        kind: String,
        doc: {type: mongoose.Schema.ObjectId, refPath: 'document.kind'}
    },
    take_due: Date,
    due_back: Date
};

const documentInstanceSchema = mongoose.Schema(documentInstanceRawModel);
virtualSetter.addId(documentInstanceSchema);

/**
 * Module exports {@link documentInstanceSchema} models
 * @type {{book: Model, journal: Model, media: Model}}
 */

module.exports = mongoose.model('DocumentInstance', documentInstanceSchema);
module.exports.raw = documentInstanceRawModel;