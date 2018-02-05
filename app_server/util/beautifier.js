'use strict';


function beautifyId(oldId) {
    let bytes = oldId.valueOf().toString().substring(18);
    return parseInt(bytes, 16);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function composePatron(model) {
    console.log(model);
    return {
        _id: model._id,
        id: model.id,
        name: {
            first: model.first_name,
            last: model.last_name
        },
        dateOfBirth: model.birth_date,
        patronType: model.patron_type,
        about: model.about,
        avatar: model.avatar,
        occupation: model.occupation,
        phone: model.phone
    }
}

function composeLibrarian(model) {
    return {
        _id: model._id,
        id: model.id,
        name: {
            first: model.first_name,
            last: model.last_name
        },
        dateOfBirth: model.birth_date,
        avatar: model.avatar,
        contacts: model.contacts,
        phone: model.phone
    }
}

module.exports.composeUser = function (user) {
    if (user.patron) return composePatron(user);
    else if (user.librarian) return composeLibrarian(user);
    else return {};
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