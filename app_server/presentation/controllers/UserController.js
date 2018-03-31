/*
 * Copyright (c) 2018 Marsel Shaihin
 */

/**
 * Module dependencies
 * @private
 */

const UsersInteractor = require('../../domain/interactors/UsersInteractor');
const config = require('../../util/config');

/**
 * Module functions
 * @private
 */

async function verifyToken(req, res) {
    let token = req.cookies[config.COOKIE_NAME];

    if (!token) {
        res.redirect('login');
        return false
    }

    let user = await UsersInteractor.verifyToken(token);
    if (user.err) {
        res.redirect('login');
        return false
    }

    return user
}

/**
 * Module exports
 * @public
 */

module.exports.dashboard = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;

    if (user.type === config.userTypes.LIBRARIAN) {
        res.render('users/patron/dashboard', {user})
    } else {
        res.render('users/patron/dashboard', {user})
    }
};

module.exports.logout = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;

    await UsersInteractor.logout(req.cookies[config.COOKIE_NAME]);
    res.redirect('login')
};