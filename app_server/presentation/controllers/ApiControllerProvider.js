/*
 * Controller provider.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const AuthController = require('./api/AuthController');
const BooksController = require('./api/BooksController');
const JournalsController = require('./api/JournalsController');
const MediaController = require('./api/MediaController');
const UsersController = require('./api/UsersController');
const UserFilesController = require('./api/UserFilesController');

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
