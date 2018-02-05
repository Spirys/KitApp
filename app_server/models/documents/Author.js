'use strict';
const beautifier    = require('../../util/beautifier');
const mongoose      = require('mongoose');

/**
 * A schema for an author
 * <ul>
 *     <li>first_name — a first name of an author</li>
 *     <li>last_name — a second name of an author</li>
 *     <li>birth_date — a birth date name of an author</li>
 *     <li>death_date — a death date name of an author</li>
 * </ul>
 */
const model = {
    first_name  : {type: String, required: true},
    last_name   : {type: String, required: true},
    birth_date  : Date,
    death_date  : Date
};

const authorSchema = new mongoose.Schema(model);

authorSchema.virtual('name').get(function () {
    return this.first_name + ' ' + this.last_name;
});

beautifier.virtualId(authorSchema);

module.exports = mongoose.model('Author', authorSchema);