'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/dashboard');

/* GET the dashboard or redirect to the authentication page. */
router.get('/', userController.dashboard);

module.exports = router;
