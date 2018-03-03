/*!
 * Author
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 */

const mongoose = require('mongoose');

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
authorSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

module.exports.models = {
    raw: authorRawModel,
    mongo: mongoose.model('Author', authorSchema)
};