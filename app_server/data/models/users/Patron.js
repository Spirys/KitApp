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
    _id: mongoose.Types.ObjectId,
    first_name: String,
    last_name: String,
    type: String,
    birth_date: Date,
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