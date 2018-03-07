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
    return await UsersRepository.get(userId)
};

module.exports.login = async function (login, password) {
    return await AuthenticationRepository.login(login, password)
};

module.exports.logout = async function (session) {
    return await AuthenticationRepository.logout(session)
};

module.exports.createSession = async function (session, user) {
    return await AuthenticationRepository.createSession(session, user)
};

module.exports.verifyToken = async function (token) {
    return await AuthenticationRepository.verifyToken(token)
};

module.exports.new = async function (fields) {
    return await UsersRepository.create(fields);
};

module.exports.deleteById = async function (id) {
    return await UsersRepository.delete(id);
};