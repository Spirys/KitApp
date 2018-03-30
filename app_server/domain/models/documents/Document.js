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
const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation.js');

/**
 * Model of the document. May be used as-is
 * @private
 */

class Document {
    constructor(title, id) {
        this.setTitle(title);
        this.id = id;
        this.setInstances([]);
    }

    setTitle(title) {
        if (validator.validateString(title)) {
            this.title = title;
        } else {
            throw new TypeError(Errors.TITLE_INVALID);
        }
    }

    setInstances(newInstances) {
        if (Array.isArray(newInstances)) {
            this.instances = [];
            for (let i = 0; i < newInstances.length; i++) {
                if (newInstances[i] instanceof DocumentInstance) {
                    this.instances.push(newInstances[i]);
                }
            }
        } else {
            throw new TypeError(Errors.INSTANCES_NOT_ARRAY);
        }
    }

    addInstance(newInstance) {
        if (newInstance instanceof DocumentInstance) {
            this.instances.push(newInstance);
        } else {
            throw new TypeError(Errors.NEW_INSTANCE_WRONG_TYPE);
        }
    }
}

/**
 * Module exports a class {@link Document}
 * @type {Document}
 * @public
 */

module.exports = Document;