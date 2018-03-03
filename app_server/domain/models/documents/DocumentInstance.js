/*!
 * A basic implementation of a document instance
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */


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

/**
 * Module exports a class {@link DocumentInstance}
 * @type {DocumentInstance}
 * @private
 */

module.exports = DocumentInstance;