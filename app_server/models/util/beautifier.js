'use strict';
// noinspection JSUnusedLocalSymbols
const beautifyId = function (oldId) {
    let bytes = oldId.valueOf().toString().substring(18);
    return parseInt(bytes, 16);
};

const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


module.exports.virtualId = function (schema) {
    schema.virtual('id').get(function () {
        return beautifyId(this._id);
    });
};

module.exports.toInstanceForm = function (name) {
    return capitalizeFirstLetter(name) + 'Instance';
};

module.exports.capitalFirst = capitalizeFirstLetter;