/*
 * Publicly available routes.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */
const express = require('express');
const router = express.Router();
const PublicController = require('../controllers/PublicController');

/**
 * GET home page. Loads the landing page
 */

router.get('/', PublicController.landing);

/**
 * GET info page. Loads the "About us" page
 */

router.get('/about', PublicController.about);

/**
 * GET documentation page.
 */

router.get('/docs', PublicController.docs);

/**
 * GET login page. Loads the page for authentication
 */

router.get('/login', PublicController.login);
router.get('/auth', PublicController.login);

/**
 * Module exports
 */

module.exports = router;