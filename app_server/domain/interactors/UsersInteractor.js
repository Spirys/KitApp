/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const AuthenticationRepository = require('../../data/RepositoryProvider').AuthenticationRepository;


/**
 * Module exports
 * @public
 */

module.exports.login = async function (login, password) {
    return await AuthenticationRepository.login(login, password)
};

module.exports.logout = async function (session) {
    return await AuthenticationRepository.logout(session)
};