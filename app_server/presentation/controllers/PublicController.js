/*
 * Controller for displaying public pages
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const messages = require('../../util/config').messages;

/**
 * Getting the locale-specific messages
 * @private
 */

function getMessages(req) {
    return messages(req.cookies.locale || "en")
}

/**
 * Module exports
 * @public
 */

module.exports.about = function (req, res) {
    res.render('public/about', {messages: getMessages(req)})
};

module.exports.docs = function (req, res) {
    res.render('public/docs', {messages: getMessages(req)})
};

module.exports.landing = function (req, res) {
    res.render('public/index', {messages: getMessages(req)})
};

module.exports.login = function (req, res) {
    res.render('public/login', {messages: getMessages(req)})
};

// module.exports.signUp = function (req, res) {
//     res.render('public/register', {messages: getMessages(req)})
// };