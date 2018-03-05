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

const sessionSchema = new mongoose.Schema({
    user        : {type: mongoose.Schema.ObjectId},
    token       : {type: String, required: true},
    expires     : {type: Number, default: Date.now()}
});

module.exports = mongoose.model('Session', sessionSchema);

/**
 * Module exports
 * @public
 */

