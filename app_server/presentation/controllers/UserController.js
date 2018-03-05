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

/**
 * Module exports
 * @public
 */

module.exports.dashboard = async function (req, res) {
    res.redirect('dashboard.html')
};