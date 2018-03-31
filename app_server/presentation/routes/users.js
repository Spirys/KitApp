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
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/dashboard', UserController.dashboard);
router.get('/catalog', UserController.dashboard);
router.get('/user-card', UserController.dashboard);
router.get('/database', UserController.dashboard);
router.get('/readers', UserController.dashboard);

router.get('/logout', UserController.logout);

/**
 * Module exports
 */

module.exports = router;