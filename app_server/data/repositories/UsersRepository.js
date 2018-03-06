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

const Users = require('../models/users/Patron');
const UserClass = require('../../data/converters/model_to_class/user/PatronModelToClass');
const UserModel = require('../../data/converters/class_to_model/users/PatronClassToModel');
const errors = require('../../util/config').errors;

/**
 * CRUD functions
 * @private
 */

async function get(id) {
    let user = await Users.findOne({
        $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
    }).exec();

    return (user) ? UserClass(user) : {err: errors.USER_NOT_FOUND};
}

async function update(user) {
    let userModel = UserModel(user);

    await Users.findByIdAndUpdate(user.innerId, userModel);

    return user;
}

async function create(query) {
    // FIXME Buggy code! Never use!
    // let user = await get(null, query);
    // if (user) {
    //     return user
    // }

    return await Users.create({
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
}

async function remove(id) {
    let user = await get(id);
    if (user.err) return user;
    await Users.remove({_id: user._id});
}

module.exports = {
    get,
    create,
    update,
    remove
};