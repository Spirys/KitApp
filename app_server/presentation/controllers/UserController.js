/*
 * Copyright (c) 2018 Marsel Shaihin
 */

/**
 * Module dependencies
 * @private
 */

const UsersInteractor = require('../../domain/interactors/UsersInteractor');
const BooksInteractor = require('../../domain/interactors/BooksInteractor');
const responseComposer = require('../composers/ResponseComposer').book;

const perm = require('../../domain/permissions/Permissions');

const config = require('../../util/config');
const logger = require('../../util/Logger');

/**
 * Module functions
 * @private
 */

function verifyToken(req, res) {
    let token = req.cookies[config.COOKIE_NAME];

    if (!token) {
        res.redirect('login');
        return false
    }

    let user = UsersInteractor.verifyToken(token);
    if (user.err) {
        res.redirect('login');
        return false
    }

    return user
}

/**
 * Getting the locale-specific messages
 * @private
 */

function getMessages(req) {
    return config.messages(config.getLocale(req))
}

function isLibrarian(user) {
    return perm.hasAccess(user, perm.SEE_DOCUMENT_EXT)
}

/**
 * Module exports
 * @public
 */

/**
 * /dashboard handler
 * @public
 */

module.exports.dashboard = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;
    let messages = getMessages(req);

    if (isLibrarian(user)) {
        res.render('users/librarian/dashboard', {user, messages})
    } else {
        res.render('users/patron/dashboard', {user, messages})
    }
};

module.exports.catalog = async function (req, res) {
    const user = verifyToken(req, res);
    if (!user) return;

    let messages = getMessages(req);

    if (isLibrarian(user)) {
        res.render('users/librarian/catalog', {user, messages})
    } else {
        res.render('users/patron/catalog', {user, messages})
    }
};

module.exports.userCard = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;
    let messages = getMessages(req);

    if (isLibrarian(user)) {
        res.render('users/librarian/user-card', {user, messages})
    } else {
        res.render('users/patron/user-card', {user, messages})
    }
};

/**
 * /database handler
 * @public
 */

module.exports.database = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;
    let messages = getMessages(req);

    if (isLibrarian(user)) {
        res.render('users/librarian/database', {user, messages})
    } else {
        res.render('errors/no-access', {user, section: 'database', messages})
    }
};

/**
 * /readers handler
 * @public
 */

module.exports.readers = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;
    let messages = getMessages(req);

    if (isLibrarian(user)) {
        res.render('users/librarian/readers', {user, messages})
    } else {
        res.render('errors/no-access', {user, section: 'readers', messages})
    }
};

/**
 * /logout handler
 * @public
 */

module.exports.logout = async function (req, res) {
    const session = req.cookies[config.COOKIE_NAME];
    const response = UsersInteractor.logout(session);

    if (!response.err) logger.info(`User ${response.id} logged out. Session ${session} removed`);
    res.redirect('login')
};