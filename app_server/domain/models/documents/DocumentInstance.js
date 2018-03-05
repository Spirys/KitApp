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

    constructor(status, id, innerId) {
        this._status = status;
        this._id = id;
        this._innerId = innerId;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

    get id() {
        return this._id;
    }

    get innerId() {
        return this._innerId;
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
        if (date == null || date === undefined || date.getDay) {
            this._dueBack = date;
            return true;
        } else return false;
    }

    get takeDue() {
        return this._takeDue;
    }

    set takeDue(date) {
        // Check whether an argument has a Date type
        if (date == null || date === undefined || date.getDay) {
            this._takeDue = date;
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