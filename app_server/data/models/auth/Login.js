/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');

/**
 * Schema
 * @private
 */

const loginSchema = new mongoose.Schema({
    user    : {type: mongoose.Schema.ObjectId, ref: 'Patron'},
    login   : String,
    password: String
});

/**
 * Module exports
 * @public
 */

module.exports = mongoose.model('Login', loginSchema);