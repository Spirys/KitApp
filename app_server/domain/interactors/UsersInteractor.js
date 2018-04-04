/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');
const logger = require('../../util/Logger');

const AuthenticationRepository = require('../../data/RepositoryProvider').AuthenticationRepository;
const UsersRepository = require('../../data/repositories/UsersRepository');

/**
 * Module exports
 * @public
 */

module.exports.getById = (userId) => UsersRepository.get(userId) || {err: config.errors.USER_NOT_FOUND};

module.exports.getAll = (page, length) => UsersRepository.getAll(page, length);

module.exports.login = (login, password) => AuthenticationRepository.login(login, password);

module.exports.logout = (session) => AuthenticationRepository.logout(session);

module.exports.createSession = (session, user) => AuthenticationRepository.createSession(session, user);

/**
 * Verifies the token.
 * @public
 * @param token
 * @return {{err}|User} The function returns either {err} with description
 *      or {user} if authentication was successful
 */
// Todo place the logic here
module.exports.verifyToken = (token) => (!token)
        ? {err: config.errors.INVALID_TOKEN}
        : AuthenticationRepository.verifyToken(token);

module.exports.new = async function (fields) {
    return await UsersRepository.create(fields);
};

module.exports.updateById = async function (id, fields) {
    let user = await UsersRepository.get(id);

    // TODO Wrap with write transaction and iteration over defined fields

    if (fields.first_name) user.first_name = fields.first_name;
    if (fields.last_name) user.last_name = fields.last_name;
    if (fields.type) user.type = fields.type;
    if (fields.birth_date) user.birth_date = fields.birth_date;
    if (fields.email) user.email = fields.email;
    if (fields.phone) user.phone = fields.phone;
    if (fields.occupation) user.occupation = fields.occupation;
    if (fields.about) user.about = fields.about;
    if (fields.telegram) user.telegram = fields.telegram;
    if (fields.avatar) user.avatar = fields.avatar;
    if (fields.address) user.address = fields.address;

    return user;
};

module.exports.deleteById = async function (id) {
    return await UsersRepository.remove(id);
};

module.exports.booksOfUser = function (user, page, length) {

};

module.exports.notifyUser = (user, notification) => {
    let action = () => {};
    switch (notification.level) {
        case 'BOOK_AVAILABLE':
            action = () => user.notifications.push(notification);
            break;
        case 'BOOK_OUTSTANDING':
            action = () => user.notifications.push(notification);
            break;
    }

    try {
        UsersRepository.write(action);
    } catch (err) {
        logger.error(err);
        return {err: config.errors.INTERNAL}
    }
};