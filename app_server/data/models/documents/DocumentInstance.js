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

/**
 * Model of the document instance. May be used as-is
 * @private
 */

const documentInstanceRawModel = {
    _id: mongoose.Types.ObjectId,
    status: String,
    taker: {type: mongoose.Types.ObjectId, ref: 'Patron', required: false},
    document: {
        kind: String,
        doc: {type: mongoose.Types.ObjectId, refPath: 'document.kind'}
    },
    take_due: {type: Date, required: false},
    due_back: {type: Date, required: false}
};

const documentInstanceSchema = mongoose.Schema(documentInstanceRawModel);
documentInstanceSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

/**
 * Module exports a class {@link DocumentInstance}
 * @type {DocumentInstance}
 * @private
 */

module.exports.models = {
    raw: documentInstanceRawModel,
    mongo: {
        book: mongoose.model('BookInstance', documentInstanceSchema),
        journal: mongoose.model('JournalInstance', documentInstanceSchema)
    }
};