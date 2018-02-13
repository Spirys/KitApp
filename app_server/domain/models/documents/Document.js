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

/**
 * Model of the document. May be used as-is
 * @private
 */

class Document {
    constructor(title) {
        this.title = title
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

/**
 * Module exports a class {@link Document}
 * @type {Document}
 * @public
 */

module.exports = Document;