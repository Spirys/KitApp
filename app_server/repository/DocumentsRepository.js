'use strict';
const config = require('../config/config');
const authorsRepository = require('./AuthorsRepository');
const Book = require('../models/documents/Book');
const DocumentInstance = require('../models/documents/DocumentInstance');
const Journal = require('../models/documents/Journal');

function findBook(title, edition, publisher) {

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
        let props= {
            title: title,
            edition: edition,
            publisher: publisher,
        };

        let book = await Book.findOne(props)
                            .populate('instances')
                            .populate('authors')
                            .exec();
        if (!book || book == null || typeof book === 'undefined'){
            book = new Book({
                title: title,
                authors: authors,
                edition: edition,
                cost: cost,
                publisher: publisher,
                keywords: keywords,
                instances: []
            });
        }

        let bookInstance = await DocumentInstance['BookInstance']();
        await bookInstance.save();

        book.instances.push(bookInstance);
        book.markModified('instances');
        return await book.save();
        // return await Book.create({
        //     title: title,
        //     authors: authors,
        //     edition: edition,
        //     cost: cost,
        //     publisher: publisher,
        //     keywords: keywords,
        //     instances: [bookInstance]});
    } catch (err) {
        return {code: config.errorCode, message: config.bookCreationFailed};
    }
}

async function createJournal(title, publisher, issue) {
    try {
        return await Journal.create({title, publisher, issue})
    } catch (err) {
        return {code: config.errorCode, message:config.journalCreationFailed}
    }
}

async function createDocument(document) {
    if (typeof document === 'undefined' || document === null) {
        return {code: config.errorCode, message: config.emptyDocument};
    }

    // This is a book
    else if (document.book) {
        let authors = await authorsRepository.getAuthors(document.book.authors);
        return await createBook(
            document.book.title,
            authors,
            document.book.edition,
            document.book.cost,
            document.book.publisher,
            document.book.keywords);
    }

    // This is a journal
    else if (document.journal) {
        let authors = await authorsRepository.getAuthors(document.journal.issue.editors);
        return await createJournal(
            document.journal.title,
            document.journal.publisher,
            {editors: authors, date: document.journal.date});
    }

    // This is a media-file
    else if (document.media) {


    } else return {code: config.errorCode, message: config.unknownDocument};
}

module.exports.getAllBooks = async function (length, page) {
    return await Book.find().limit(length).populate('authors').populate('instances').exec();
};

module.exports.createDocument = createDocument;