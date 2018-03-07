/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentParent = require('./Document').raw;
const mongoose = require('mongoose');
const virtualSetter = require('../VirtualSetter');

/**
 * A media model
 */

const mediaRawModel = Object.assign({}, DocumentParent, {
    authors: [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
    cost: Number,
    keywords: [String],
    bestseller: {type: Boolean, default: false},
    description: String,
    image: String,
    published: String
});

const mediaSchema = mongoose.Schema(mediaRawModel);
virtualSetter.addId(mediaSchema);

/**
 * Module exports
 * @public
 */

module.exports = mongoose.model('Media', mediaSchema);
module.exports.raw = mediaRawModel;