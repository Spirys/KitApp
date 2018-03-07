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
const LoginRepo = require('./AuthenticationRepository');
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

async function getAll(page, length) {
    let users = await UserDB.find()
        .skip((page - 1) * length)
        .limit(length)
        .exec();

    let userClasses = [];
    for (let i = 0; i < users.length; i++) {
        let u = users[0];

        userClasses.push(UserClass(u));
    }

    return userClasses;
}

async function search(query) {
    let users = await UserDB.find(query).exec();

    let userClasses = [];
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        userClasses.push(UserClass(user));
    }

    return userClasses;
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

    let user = await Users.create({
        first_name: query.first_name,
        last_name: query.last_name,
        type: query.type,
        birth_date: query.birth_date,
        email: query.email,
        phone: query.phone,
        occupation: query.occupation,
        about: query.about,
        telegram: query.telegram,
        avatar: query.telegram,
        address: query.address
    });
    let email = query.email;
    let password = query.password;

    let userClass = UserClass(user);

    await LoginRepo.createLogin(email, password, userClass);

    return userClass
}

async function remove(id) {
    let user = await get(id);
    if (user.err) return user;
    await Users.remove({_id: user.innerId});
    return user
}

module.exports = {
    get,
    create,
    update,
    remove
};