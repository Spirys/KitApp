/*!
 * Article
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation.js');

/**
 * An article model
 */

class Article {

    /**
     * Constructor for the book object
     * @param name
     * @param authors
     */
    constructor(name, authors){
        this.name = name;
        this._authors = authors;
    }

    get authors() {
        return this._authors
    }

    set authors(value) {
        this._authors = value
    }

    get name(){
        return this._name
    }

    set name(name) {
        const valid = validator.validateString(name);
        if (valid) {
            this._name = name
        } else {
            throw new TypeError(Errors.TITLE_INVALID)
        }
    }
}

/**
 * Module exports a {@link Book} class
 * @type {Book}
 */

module.exports = Book;