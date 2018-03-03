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

const mongoose = require('mongoose');
const User = require('../models/users/Patron').models.mongo;

/**
 * CRUD functions
 * @private
 */

async function get(id = null, query = null, count = 1) {
    if (id) {
        return await User.findOne({
            $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
        }, err => {
            if (err) console.log(err);
            // found!
        }).exec();
    }
    else if (query) {
        let users = await User.find(query, err => {
            if (err) console.log(err);
            // found!
        }).exec();

        if (users && count === 1) {
            return users[0];
        } else if (users && count !== -1) {
            return users.slice(0, count);
        } else {
            return users;
        }
    }
    else {
        return null;
    }
}

async function update(id, query) {
    let user = await get(id);
    if (!user) {
        return null;
    }

    if (query.first_name) user.first_name = query.first_name;
    if (query.last_name) user.last_name = query.last_name;
    if (query.type) user.type = query.type;
    if (query.birth_date) user.birth_date = query.birth_date;
    if (query.email) user.email = query.email;
    if (query.phone) user.phone = query.phone;
    if (query.occupation) user.occupation = query.occupation;
    if (query.about) user.about = query.about;
    if (query.telegram) user.telegram = query.telegram;
    if (query.avatar) user.avatar = query.avatar;

    return await user.save();
}

async function create(query) {
    let user = await get(null, query);
    if (user) {
        return user
    }

    user = await User.create({
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
        await User.remove({_id: user._id}, err => {
            if (err) {
                console.log(err);
                return false;
            }
            // removed!
        });

        return true;
    }
    return false;
}