/*
 * Controller provider.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const AuthController = require('../controllers/api/AuthController');
const BooksController = require('../controllers/api/BooksController');
const JournalsController = require('../controllers/api/JournalsController');
const MediaController = require('../controllers/api/MediaController');
const UsersController = require('../controllers/api/UsersController');
const UserFilesController = require('../controllers/api/UserFilesController');

/**
 * Module exports
 * @public
 */

module.exports.authController = AuthController;
module.exports.booksController = BooksController;
module.exports.journalsController = JournalsController;
module.exports.mediaController = MediaController;
module.exports.usersController = UsersController;
module.exports.userFilesController = UserFilesController;