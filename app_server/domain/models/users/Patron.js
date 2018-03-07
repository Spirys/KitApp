/*
 * The patron model
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */


/**
 * The model for patron
 * @see Patron#constructor
 * @private
 */

// WTF
class Patron {
    constructor(firstName, lastName, id, innerId, type, birthDate, phone) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._id = id;
        this._innerId = innerId;
        this._type = type;
        this._birthDate = birthDate;
        this._phone = phone;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get id() {
        return this._id;
    }

    get innerId(){
        return this._innerId;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get birthDate() {
        return this._birthDate;
    }

    set birthDate(value) {
        this._birthDate = value;
    }

    get email() {
        return this._email;
    }

    set email(email){
        this._email = email;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get occupation() {
        return this._occupation;
    }

    set occupation(value) {
        this._occupation = value;
    }

    get about() {
        return this._about;
    }

    set about(value) {
        this._about = value;
    }

    get telegram() {
        return this._telegram;
    }

    set telegram(value) {
        this._telegram = value;
    }

    get avatar() {
        return this._avatar;
    }

    set avatar(value) {
        this._avatar = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get takenDocuments() {
        return this._takenDocuments;
    }

    set takenDocuments(value) {
        this._takenDocuments = value;
    }
}


/**
 * Module exports a {@link Patron} class
 * @type {Patron}
 * @public
 */

module.exports = Patron;