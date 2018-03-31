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
router.get('/catalog', UserController.catalog);
router.get('/user-card', UserController.userCard);
router.get('/database', UserController.database);
router.get('/readers', UserController.readers);

router.get('/logout', UserController.logout);

/**
 * Module exports
 */

module.exports = router;