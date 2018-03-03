/*
 * The patron model
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');

/**
 * The model for patron
 * @see Patron#constructor
 * @private
 */

const patronRawModel = {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    type: {type: String, required: true},
    birth_date: {type: String, required: true},
    email: String,
    phone: String,
    occupation: String,
    about: String,
    telegram: String,
    avatar: String
};

/**
 * Module exports a {@link Patron} class
 * @type {Patron}
 * @public
 */

module.exports.models = {
    raw: patronRawModel,
    mongo: mongoose.model('Patron', mongoose.Schema(patronRawModel))
};