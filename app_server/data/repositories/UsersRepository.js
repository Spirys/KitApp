/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const LoginRepo = require('./AuthenticationRepository');
const errors = require('../../util/config').errors;

const realm = require('../db').realm;
const User = require('../../domain/models/users/User');
const Login = require('../../domain/models/auth/Login');

/**
 * CRUD functions
 * @private
 */

const get = (id) => realm.objectForPrimaryKey('User', id);

async function getAll(page, length) {
    return realm.objects('User').slice((page - 1) * length, length);
}

// TODO:
async function search(query) {
    // let users = await UserDB.find(query).exec();
    //
    // let userClasses = [];
    // for (let i = 0; i < users.length; i++) {
    //     let user = users[i];
    //     userClasses.push(UserClass(user));
    // }
    //
    // return userClasses;
}

// TODO:
async function update(user) {
    // let userModel = UserModel(user);
    //
    // await Users.findByIdAndUpdate(user.innerId, userModel);
    //
    // return user;
}

async function create(query) {
    let user = undefined;

    let id = realm.objects('User').max('id') + 1 || 0;

    realm.write(() => {
        user = realm.create('User', {
            id: id,
            first_name: query.first_name,
            last_name: query.last_name,
            type: query.type,

            // books: [],
            // journals: [],
            // media: [],

            birth_date: query.birth_date,
            email: query.email,
            phone: query.phone,
            occupation: query.occupation,
            about: query.about,
            telegram: query.telegram,
            avatar: query.avatar,
            address: query.address
        });

        LoginRepo.createLogin(query.email, query.password, user);
    });

    return user
}

async function remove(id) {
    let user = get(id);

    if (user.err) {
        return user;
    } else {
        let logins = realm.objects('Login').filtered('user == $0', user);
        let sessions = realm.objects('Sessions').filtered('user == $0', user);
        realm.write(() => {
            realm.delete(sessions);
            realm.delete(logins);
            realm.delete(user);
        });
    }

    return user;
}

/**
 * Module exports
 * @public
 */

module.exports.create = create;
module.exports.read = get;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = remove;
module.exports.remove = remove;
module.exports.write = (action) => realm.write(action);