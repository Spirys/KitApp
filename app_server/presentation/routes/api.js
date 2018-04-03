/*
 * Routes for API.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const router = require('express').Router();
const apiProvider = require('../controllers/ApiControllerProvider');

/**
 * Router configuration for books
 * @private
 */

router.get('/books/all', apiProvider.booksController.getAll);
router.get('/books/search', apiProvider.booksController.search);
router.post('/books', apiProvider.booksController.new);

router.get('/books/:id', apiProvider.booksController.getById);
router.put('/books/:id', apiProvider.booksController.updateById);
router.delete('/books/:id', apiProvider.booksController.deleteById);
router.post('/books/:id/checkout', apiProvider.booksController.checkoutById);
router.post('/books/:id/return', apiProvider.booksController.returnById);
router.post('/books/:id/renew', apiProvider.booksController.renewById);
router.post('/books/:id/outstanding', apiProvider.booksController.outstandingRequest);
router.post('/books/:id/outstanding/cancel', apiProvider.booksController.cancelOutstandingRequest);

router.get('/books/:id/instances', apiProvider.booksController.getAll);
router.post('/books/:id/instances', apiProvider.booksController.newInstance);
router.get('/books/:id/instances/:instanceId', apiProvider.booksController.getInstanceById);
router.put('/books/:id/instances/:instanceId', apiProvider.booksController.updateInstanceById);
router.delete('/books/:id/instances/:instanceId', apiProvider.booksController.deleteInstanceById);

/**
 * Router configuration for media
 * @private
 */

router.get('/media/all', apiProvider.mediaController.getAll);
router.get('/media/search', apiProvider.mediaController.search);
router.post('/media', apiProvider.mediaController.new);

router.get('/media/:id', apiProvider.mediaController.getById);
router.put('/media/:id', apiProvider.mediaController.updateById);
router.delete('/media/:id', apiProvider.mediaController.deleteById);
router.post('/media/:id/checkout', apiProvider.mediaController.checkoutById);
router.post('/media/:id/return', apiProvider.mediaController.returnById);

router.get('/media/:id/instances', apiProvider.mediaController.getAll);
router.post('/media/:id/instances', apiProvider.mediaController.newInstance);
router.get('/media/:id/instances/:instanceId', apiProvider.mediaController.getInstanceById);
router.put('/media/:id/instances/:instanceId', apiProvider.mediaController.updateInstanceById);
router.delete('/media/:id/instances/:instanceId', apiProvider.mediaController.deleteInstanceById);


/**
 * Router configuration for authentication
 * @private
 */

router.post('/login', apiProvider.authController.login);
router.post('/logout', apiProvider.authController.logout);
// router.post('/signup', apiProvider.authController.signUp);

/**
 * Router configuration for users
 * @private
 */

router.get('/users/all', apiProvider.usersController.getAll);
router.get('/users/search', apiProvider.usersController.search);
router.post('/users', apiProvider.usersController.new);

router.get('/users/:id', apiProvider.usersController.getById);
router.put('/users/:id', apiProvider.usersController.updateById);
router.delete('/users/:id', apiProvider.usersController.deleteById);

/**
 * Router configuration for images
 * @private
 */

router.post('/images', apiProvider.userFilesController.loadImage);

/**
 * Module exports
 * @public
 */

module.exports = router;