'use strict';
const config = require('../config/config');
const authorsRepository = require('./AuthorsRepository');

function findBook(title, author, publisher) {

}

function getBook(id) {

}

function getArticle(id) {

}

function getJournal(id) {

}

function getInstancesOf(id) {

}

function createBook(title, authors, publisher, edition, next) {
    const authorIds = authorsRepository.getAuthors(authors);
}

function createDocument(document, next) {
    if (typeof document === 'undefined' || document === null) {
        return {code: config.errorCode, message: config.emptyDocument};
    } else if (document.book) {
        // This is a book
        createBook(document.book.title,
            document.book.authors,
            document.book.publisher,
            document.book.edition, next);
    } else if (document.journal) {
        // This is a journal

    } else if (document.media) {
        // This is a media-file

    } else return {code: config.errorCode, message: config.unknownDocument};
}

module.exports.getAllBooks = function (length, page, next) {
    let results = [];
    next(results);
};