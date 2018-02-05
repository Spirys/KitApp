'use strict';
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const userController = require('../controllers/dashboard');

/* GET home page. */
router.get('/', mainController.index);

/* GET the user profile*/
router.get('/user', mainController.profile);
router.get('/profile', userController.profile);
router.get('/card', userController.card);
router.get('/search', userController.search);

/* GET auth page. */
router.get('/auth', mainController.auth);
router.post('/auth', mainController.auth);

module.exports = router;