'use strict';

const Author = require('./AuthorClassToModel');
const BookInstance = require('./DocumentInstanceClassToModel');

module.exports = book => {
    let authors = [];
    book.authors.forEach(aut => {
        let author = Author(aut);

        authors.push(author);
    });

    let instances = [];
    if (book.instances) {
        book.instances.forEach(inst => {
            let instance = BookInstance(inst);

            instances.push(instance);
        });
    }

    let bookModel = {
        _id: book.innerId,
        title: book.title,
        authors: authors,
        instances: instances,
        cost: book.cost,
        edition: book.edition,
        isbn: book.isbn,
        keywords: book.keywords
    };

    bookModel.bestseller = (book.isBestseller != null || book.isBestseller !== undefined) ? book.isBestseller : undefined;
    bookModel.description = (book.description) ? book.description : undefined;
    bookModel.image = (book.image) ? book.image : undefined;
    bookModel.publisher = (book.publisher) ? book.publisher : undefined;
    bookModel.published = (book.published) ? book.published : undefined;

    return bookModel;
};