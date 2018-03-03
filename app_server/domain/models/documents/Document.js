/*!
 * An abstraction of a document
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentInstance = require('DocumentInstance');
const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation.js');
const mongoose = require('mongoose');

/**
 * Model of the document. May be used as-is
 * @private
 */

class Document {
    constructor(title, id) {
        this.title = title;
        this._id = id
    }

    get title() {
        return this._title
    }

    set title(title) {
        if (validator.validateString(title)) {
            this._title = title
        } else {
            throw new TypeError(Errors.TITLE_INVALID)
        }
    }

    get id() {
        return this._id
    }

    get instances() {
        if (!this._instances || !this._instances.push) {
            return []
        } else return this._instances
    }

    set instances(newInstances) {
        if (Array.isArray(newInstances)) {
            this._instances = [];
            for (let i = 0; i < newInstances.length; i++) {
                if (newInstances[i] instanceof DocumentInstance) {
                    this.instances.push(newInstances[i])
                }
            }
        } else {
            throw new TypeError(Errors.INSTANCES_NOT_ARRAY)
        }
    }

    addInstance(newInstance) {
        if (newInstance instanceof DocumentInstance) {
            this.instances.push(newInstance)
        } else {
            throw new TypeError(Errors.NEW_INSTANCE_WRONG_TYPE)
        }
    }
}

const documentRawModel = {
    _id: mongoose.Types.ObjectId,
    title: String,
    instances: [{type: mongoose.Types.ObjectId, ref: 'Instance'}]
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

module.exports = Document;
module.exports.models = {
    raw: documentRawModel,
    mongo: mongoose.model('Document', documentSchema)
};