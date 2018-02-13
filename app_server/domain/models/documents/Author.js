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

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName
    }

    get firstName(){
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

    get lastName(){
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

    get birthDate(){

    }

    get deathDate(){

    }


}

module.exports = Author;