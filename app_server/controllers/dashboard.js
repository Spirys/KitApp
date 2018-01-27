'use strict';
const auth = require('./auth');

module.exports.dashboard = function (req, res) {
    let session = req.cookies._sessionId;
    let user = auth.verifySession(session);
    if (session && user) {
        res.render('index', {title: user});
    } else {
        res.render('auth', {title: 'Sign in'});
    }
};