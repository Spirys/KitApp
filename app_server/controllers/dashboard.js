'use strict';
const auth = require('./auth');
const config = require('../config/config');

function fetchBookInfo(id) {

}

module.exports.dashboard = async function (req, res) {

    let session = req.cookies._sessionId;
    let response = await auth.verifySession(session);

    if (response.code === config.okCode) {
        res.render('index', {title: 'Success', debugInfo: JSON.stringify(response)});
    } else {
        res.render('auth', {title: config.signIn});
    }
};