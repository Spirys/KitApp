/*
 * Routes for user dashboard.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');

/* GET users listing. */
router.get('/dashboard', controller.dashboard);

/**
 * Module exports
 */

module.exports = router;