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

class DocumentInstance {

    constructor(status) {
        this._status = status;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

    get taker() {
        return this._taker;
    }

    set taker(taker) {
        this._taker = taker;
    }

    get dueBack() {
        return this._dueBack;
    }

    set dueBack(date) {
        // Check whether an argument has a Date type
        if (date.getDay) {
            this._dueBack = date;
            return true;
        } else return false;
    }
}

const documentInstanceRawModel = {
    _id: mongoose.Types.ObjectId,
    status: String,
    taker: {type: mongoose.Types.ObjectId, ref: 'Patron', required: false},
    document: {
        kind: String,
        dos: {type: mongoose.Types.ObjectId, refPath: 'document.kind'}
    },
    take_due: {type: Date, required: false},
    due_back: {type: Date, required: false}
};

const documentInstanceSchema=mongoose.Schema(documentInstanceRawModel);
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

module.exports = DocumentInstance;
module.exports.models = {
    raw: documentInstanceRawModel,
    mongo: {
        book: mongoose.model('BookInstance', documentInstanceSchema),
        journal: mongoose.model('JournalInstance', documentInstanceSchema)
    }
};