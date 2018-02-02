'use strict';
const config = require('../config/config');
const authorsRepository = require('./AuthorsRepository');
const Book = require('../models/documents/Book');

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

async function createBook(title, authors, edition, cost, publisher, keywords) {
    try {
        return await Book.create({title, authors, edition, cost, publisher, keywords})
    } catch (err) {
        return {code: config.errorCode, message: config.bookCreationFailed}
    }
}

async function createDocument(document) {
    if (typeof document === 'undefined' || document === null) {
        return {code: config.errorCode, message: config.emptyDocument};
    }

    // This is a book
    else if (document.book) {
        let authors = await authorsRepository.getAuthors(document.book.authors);
        return await createBook(document.book.title,
            authors,
            document.book.edition,
            document.book.cost,
            document.book.publisher,
            document.book.keywords);
    }

    // This is a journal
    else if (document.journal) {

    }

    // This is a media-file
    else if (document.media) {


    } else return {code: config.errorCode, message: config.unknownDocument};
}

module.exports.getAllBooks = async function (length, page) {
    return await Book.find().limit(length).populate('authors').exec();
};

module.exports.createDocument = createDocument;