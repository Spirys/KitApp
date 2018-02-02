'use strict';
const beautifier    = require('../../util/beautifier');
const mongoose      = require('mongoose');

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