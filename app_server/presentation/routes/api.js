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

router.get("/books/all", apiProvider.booksController.getAll);
router.get("/books/search", apiProvider.booksController.search);
router.post("/books", apiProvider.booksController.new);

router.get("/books/:id", apiProvider.booksController.getById);
router.put("/books/:id", apiProvider.booksController.updateById);
router.delete("/books/:id", apiProvider.booksController.deleteById);
router.post("/books/:id/checkout", apiProvider.booksController.checkoutById);
router.post("/books/:id/return", apiProvider.booksController.returnById);

router.get("/books/:id/instances", apiProvider.booksController.getAll);
router.post("/books/:id/instances", apiProvider.booksController.newInstance);
router.get("/books/:id/instances/:instanceId", apiProvider.booksController.getInstanceById);
router.put("/books/:id/instances/:instanceId", apiProvider.booksController.updateInstanceById);
router.delete("/books/:id/instances/:instanceId", apiProvider.booksController.deleteInstanceById);

/**
 * Router configuration for authentication
 * @private
 */

router.post('/login', apiProvider.authController.login);
router.post('/logout', apiProvider.authController.logout);

/**
 * Router configuration for users
 * @private
 */

router.get("/users/all", apiProvider.usersController.getAll);
router.get("/users/search", apiProvider.usersController.search);
router.post("/users", apiProvider.usersController.new);

router.get("/users/:id", apiProvider.usersController.getById);
router.put("/users/:id", apiProvider.usersController.updateById);
router.delete("/users/:id", apiProvider.usersController.deleteById);

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