'use strict';
const auth = require('./auth');
const config = require('../config/config');

function fetchBookInfo(id) {

}

module.exports.dashboard = function (req, res) {
    let session = req.cookies._sessionId;
    auth.verifySession(session, function (user) {
        res.render('index', {title: 'Success', debugInfo: JSON.stringify(user)});
    }, function () {
        res.render('auth', {title: config.signIn});
    });
};