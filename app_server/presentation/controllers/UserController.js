/*
 * Copyright (c) 2018 Marsel Shaihin
 */

/**
 * Module dependencies
 * @private
 */

const UsersInteractor = require('../../domain/interactors/UsersInteractor');
const config = require('../../util/config');
const BooksInteractor = require('../../domain/interactors/BooksInteractor');
const responseComposer = require('../composers/ResponseComposer').book;

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
 * Getting the locale-specific messages
 * @private
 */

function getMessages(req) {
    return config.messages(config.getLocale(req))
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

    if (user.type === config.userTypes.LIBRARIAN) {
        res.render('users/librarian/dashboard', {user, messages})
    } else {
        res.render('users/patron/dashboard', {user, messages})
    }
};

module.exports.catalog = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;

    let messages = getMessages(req),
        isLibrarian = user.type === config.userTypes.LIBRARIAN,
        books = BooksInteractor.getAll(1, 25);

    books = responseComposer.formatMultiple(books, isLibrarian).books;
    console.log(books);

    if (isLibrarian) {
        res.render('users/librarian/catalog', {user, messages, books})
    } else {
        res.render('users/patron/catalog', {user, messages, books})
    }
};

module.exports.userCard = async function (req, res) {
    const user = await verifyToken(req, res);
    if (!user) return;
    let messages = getMessages(req);

    if (user.type === config.userTypes.LIBRARIAN) {
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

    if (user.type === config.userTypes.LIBRARIAN) {
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

    if (user.type === config.userTypes.LIBRARIAN) {
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
    const user = await verifyToken(req, res);
    if (!user) return;

    await UsersInteractor.logout(req.cookies[config.COOKIE_NAME]);
    res.redirect('login')
};