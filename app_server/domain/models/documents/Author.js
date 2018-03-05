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

/**
 * Author model
 */

class Author {

    constructor(firstName, lastName, id, innerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._id = id;
        this._innerId = innerId;
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

    get id() {
        return this._id;
    }

    get innerId() {
        return this._innerId;
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

module.exports = Author;