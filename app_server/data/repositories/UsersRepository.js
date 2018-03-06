/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module exports
 * @public
 */

module.exports.create = create;
module.exports.read = get;
module.exports.get = get;
module.exports.update = update;
module.exports.delete = remove;
module.exports.remove = remove;

/**
 * Module dependencies
 * @private
 */

const UserDB = require('../models/users/Patron');

const UserClass = require('../../data/converters/model_to_class/user/PatronModelToClass');

const UserModel = require('../../data/converters/class_to_model/users/PatronClassToModel');

/**
 * CRUD functions
 * @private
 */

async function get(id) {
    let userDb = await UserDB.findOne({
        $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
    }).exec();

    return UserClass(userDb);
}

async function update(user) {
    let userModel = UserModel(user);

    await UserDB.findByIdAndUpdate(user.innerId, user);

    return user;
}

async function create(query) {
    let user = await get(null, query);
    if (user) {
        return user
    }

    user = await UserDB.create({
        first_name: query.first_name,
        last_name: query.last_name,
        type: query.type,
        birth_date: query.date,
        email: query.email,
        phone: query.phone,
        occupation: query.occupation,
        about: query.about,
        telegram: query.telegram,
        avatar: query.telegram
    });
    return user;
}

async function remove(id) {
    let user = await get(id);
    if (user) {
        await UserDB.remove({_id: user._id});

        return true;
    }
    return false;
}

module.exports = {
    get,
    create,
    update,
    remove
};