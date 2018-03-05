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

    if (book.isBestseller != null || book.isBestseller !== undefined) bookModel.bestseller = book.isBestseller;
    if (book.description) bookModel.description = book.description;
    if (book.image) bookModel.image = book.image;
    if (book.publisher) bookModel.publisher = book.publisher;
    if (book.published) bookModel.published = book.published;

    return bookModel;
};