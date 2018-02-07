'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const booksController = require('../controllers/api/books');

router.get('/', function (req, res) {
    res.send('respond with a resource');
});

/* POST request to the auth page */
router.post('/login', authController.login);

/*
    GET requests for the books
 */
router.get('/books/all', booksController.all);
router.get('/books/search', booksController.all);

/*
    POST request to the books
 */
router.post('/books', booksController.create);

/*
    Specific book
 */

/**
 * GET request to the book returns the book from the database
 */
router.get('/books/:id', booksController.getById);

/**
 * POST request to the book checks it out or adds a user to query
 */
router.post('/books/:id/checkout', booksController.checkOut);

/**
 * DELETE request to the book deletes it from the database
 */
router.delete('/books/:id', booksController.delete);

/*
    Export the router
 */
module.exports = router;
