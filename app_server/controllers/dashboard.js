'use strict';
const auth              = require('./auth');
const config            = require('../config/config');
const UserRepository    = require('../repository/UsersRepository');

function fetchBookInfo(id) {

}

module.exports.dashboard = async function (req, res) {

    let session = req.cookies._sessionId;
    let response = await auth.verifySession(session);

    if (response.code === config.okCode) {
        res.render('patron/dashboard', {title: 'Success', debugInfo: JSON.stringify(response)});
    } else {
        res.render('auth', {title: config.signIn});
    }
};

module.exports.profile = async function (req, res) {

    let session = req.cookies._sessionId;
    let response = await auth.verifySession(session);

    if (response.code === config.okCode) {
        let user = await UserRepository.getUserById(response.session.user);
        if (user.code === config.okCode) {
            user = user.user;
            res.render('patron/profile', {
                title       : 'Success',
                first_name  : user.name.first,
                last_name   : user.name.last,
                id          : user.id,
                email       : "Not available",
                phoneNumber : user.phone,
                birthDay    : user.dateOfBirth,
                about       : user.about ? user.about : "",
                avatar      : user.avatar
            });
        } else {
            res.render('auth', {title: config.signIn});
        }
    } else {
        res.render('auth', {title: config.signIn});
    }
};

module.exports.card = async function (req, res) {

    let session = req.cookies._sessionId;
    let response = await auth.verifySession(session);

    if (response.code === config.okCode) {
        res.render('patron/card', {title: "Card"})
    } else {
        res.render('auth', {title: config.signIn});
    }
};

module.exports.search = function (req, res) {
    res.render('patron/search', {title: 'Search'})
};