'use strict';
const dashboard = require('./dashboard');

module.exports.index    = dashboard.dashboard;
module.exports.profile  = dashboard.profile;

module.exports.auth = function (req, res) {
    res.render('auth', { title : 'Sign in' })
};