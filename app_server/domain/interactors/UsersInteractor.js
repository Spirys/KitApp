/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const AuthenticationRepository = require('../../data/RepositoryProvider').AuthenticationRepository;
const UsersRepository = require('../../data/RepositoryProvider').UsersRepository;

/**
 * Module exports
 * @public
 */

module.exports.getById = async function (userId) {
    return await UsersRepository.get(userId);
};

module.exports.getAll = async function (page, length) {
    return await UsersRepository.getAll(page, length);
};

module.exports.login = async function (login, password) {
    return await AuthenticationRepository.login(login, password);
};

module.exports.logout = async function (session) {
    return await AuthenticationRepository.logout(session);
};

module.exports.createSession = async function (session, user) {
    return await AuthenticationRepository.createSession(session, user);
};

module.exports.verifyToken = async function (token) {
    return await AuthenticationRepository.verifyToken(token);
};

module.exports.new = async function (fields) {
    return await UsersRepository.create(fields);
};

module.exports.updateById = async function (id, fields) {
    let user = await UsersRepository.get(id);

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