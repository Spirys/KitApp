'use strict';
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

/* GET home page. */
router.get('/', mainController.index);

/* GET auth page. */
router.get('/auth', mainController.auth);
router.post('/auth', mainController.auth);

module.exports = router;