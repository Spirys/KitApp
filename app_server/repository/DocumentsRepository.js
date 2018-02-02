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

async function createBook(title, authors, publisher, edition, next) {
    const authorIds = await authorsRepository.getAuthors(authors);
}

async function createDocument(document, next) {
    if (typeof document === 'undefined' || document === null) {
        return {code: config.errorCode, message: config.emptyDocument};
    }

    // This is a book
    else if (document.book) {
        let authors = await authorsRepository.getAuthors(document.book.authors, );
        let book = await createBook(document.book.title,
            document.book.authors,
            document.book.cost,
            document.book.edition,
            document.book.keywords);
        next(book);
    }

    // This is a journal
    else if (document.journal) {


    }

    // This is a media-file
    else if (document.media) {


    } else return {code: config.errorCode, message: config.unknownDocument};
}

module.exports.getAllBooks = async function (length, page) {
    return await [];
};

module.exports.create = createDocument();