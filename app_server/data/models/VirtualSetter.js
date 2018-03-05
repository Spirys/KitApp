'use strict';

function beautifyId(oldId) {
    let bytes = oldId.valueOf().toString().substring(18);
    return parseInt(bytes, 16);
}

const virtualId = function (schema) {
    schema.virtual('id').get(function () {
        let bytes = this._id.valueOf()
            .toString()
            .substring(18);
        return parseInt(bytes, 16);
    })
};

function addId(schema) {
    schema.virtual('id').get(function () {
        let bytes = this._id.valueOf()
            .toString()
            .substring(18);
        return parseInt(bytes, 16);
    });
}

module.exports = {
    addId: addId
};