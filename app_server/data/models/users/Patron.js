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
const virtualSetter = require('../VirtualSetter');

/**
 * The model for patron
 * @private
 */

// WTF
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
    avatar: String,
    address: String,
    taken_documents: [{
        kind: String,
        doc: {type: mongoose.Schema.ObjectId, refPath: 'taken_documents.kind'}
    }]
};

const patronSchema = mongoose.Schema(patronRawModel);
virtualSetter.addId(patronSchema);

/**
 * Module exports a {@link patronSchema} model
 * @type {Model}
 */

module.exports = mongoose.model('Patron', patronSchema);
module.exports.raw = patronRawModel;