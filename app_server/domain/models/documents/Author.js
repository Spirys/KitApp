/*!
 * Author
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 */

const validator = require('../../validation/SetterValidation.js');
const Errors = require('../../Errors');
const mongoose = require('mongoose');

/**
 * Author model
 */

class Author {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName
    }

    get firstName() {
        return this._firstName
    }

    set firstName(name) {
        const valid = validator.validateString(name);
        if (valid) {
            this._firstName = name
        } else {
            throw new TypeError(Errors.NAME_INVALID)
        }
    }

    get lastName() {
        return this._lastName
    }

    set lastName(name) {
        const valid = validator.validateString(name);
        if (valid) {
            this._lastName = name
        } else {
            throw new TypeError(Errors.NAME_INVALID)
        }
    }

    get birthDate() {
        return this._birthDate
    }

    set birthDate(value) {
        if (validator.validateDate(value)) {
            this._birthDate = value
        } else {
            throw new TypeError(Errors.INVALID_DATE)
        }
    }

    get deathDate() {
        return this._deathDate
    }

    set deathDate(value) {
        if (validator.validateDate(value)) {
            this._deathDate = value
        } else {
            throw new TypeError(Errors.INVALID_DATE)
        }
    }
}

const authorRawModel = {
    _id: mongoose.Types.ObjectId,
    first_name: String,
    last_name: String,
    birth_date: {type: Date, required: false},
    death_date: {type: Date, required: false}
};

const authorSchema = mongoose.Schema(authorRawModel);
authorSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

module.exports = Author;
module.exports.models = {
    raw: authorRawModel,
    mongo: mongoose.model('Author', authorSchema)
};