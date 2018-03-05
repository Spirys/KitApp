/*!
 * Author
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');
const virtualSetter = require('../VirtualSetter');

/**
 * Author model
 */

const authorRawModel = {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birth_date: String,
    death_date: String
};

const authorSchema = mongoose.Schema(authorRawModel);
virtualSetter.addId(authorSchema);

/**
 * Module exports an {@link authorSchema} model
 * @type {Model}
 */

module.exports = mongoose.model('Author', authorSchema);
module.exports.raw = authorRawModel;