/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentParent = require('./Document');
const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation');

/**
 * A Media medel
 */

class Media extends DocumentParent {
    constructor(title, id, innerId, authors, cost, keywords) {
        super(title, id, innerId);
        this._authors = authors;
        this._cost = cost;
        this._keywords = keywords;
    }

    get authors() {
        return this._authors
    }

    set authors(value) {
        this._authors = value
    }

    get isBestseller() {
        return this._bestseller || false
    }

    set isBestseller(isBestseller) {
        // Check whether an input is strictly a boolean. IMHO, 'typeof' would be slower.
        if (isBestseller === true || isBestseller === false) {
            this._bestseller = isBestseller
        } else {
            throw new TypeError(Errors.IS_BESTSELLER_INVALID)
        }
    }

    get cost() {
        return this._cost
    }

    set cost(value) {
        this._cost = value;
    }

    get description() {
        return this._description || ''
    }

    set description(description) {
        if (validator.validateString) {
            this._description = description
        } else {
            throw new TypeError(Errors.DESCRIPTION_INVALID)
        }
    }

    get image() {
        return this._image || ''
    }

    // TODO write image validation (simply URL)
    set image(image) {
        this._image = image
    }

    get keywords() {
        return this._keywords
    }

    set keywords(keywords) {
        if (Array.isArray(keywords)) {
            this._keywords = [];
            for (let i = 0; i < keywords.length; i++) {
                if (typeof keywords[i] === 'string') {
                    this._keywords.push(keywords[i])
                }
            }
        } else {
            throw new TypeError(Errors.KEYWORDS_NOT_ARRAY)
        }
    }

    /**
     * Adds a keyword to the book
     * @param keyword a keyword to add to the book
     */
    addKeyword(keyword) {
        if (typeof keyword === 'string' && this.keywords.indexOf(keyword) === -1) {
            this.keywords.push(keyword)
        }
    }

    removeKeyword(keyword) {

        // Prevent unnecessary array traversing if types don't match
        if (typeof keyword !== 'string') {
            return false
        }

        // Find and remove if exists
        let index = this.keywords.indexOf(keyword);
        if (index !== -1) {
            this.keywords.splice(index, 1);
            return true
        }
        return false
    }

    get published() {
        return this._published || ''
    }

    set published(published) {
        // Check whether this is a date
        if (published.getTime) {
            this._published = published
        }
    }
}

/**
 * Module exports
 * @public
 */

module.exports = Media;