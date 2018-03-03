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
    _id: mongoose.Types.ObjectId,
    first_name: String,
    last_name: String,
    birth_date: {type: Date, required: false},
    death_date: {type: Date, required: false}
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