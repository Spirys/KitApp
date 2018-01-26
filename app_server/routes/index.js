var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');
var authController = require('../controllers/auth');
var userController = require('../controllers/userPage');

/* GET home page. */
router.get('/', mainController.index);

/* GET auth page. */
router.get('/auth', mainController.auth);
router.post('/auth', mainController.auth);

/* POST the data to the auth page. */
router.post('/api/login', authController.login);

/* GET the dashboard or redirect to the authentication page. */
router.get('/dashboard', userController.dashboard);

module.exports = router;