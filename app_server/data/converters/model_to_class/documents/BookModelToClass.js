'use strict';

const Book = require('../../../../domain/models/documents/Book');
const Author = require('./AuthorModelToClass');
const BookInstance = require('./DocumentInstanceModelToClass');

module.exports = book => {
    if (!book) {
        return null;
    }

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

    let bookClass = new Book(book.title, book.id, book._id, authors, book.cost,
        book.edition, book.isbn, book.keywords);

    bookClass.instances = instances;
    if (book.bestseller != null || book.bestseller !== undefined) bookClass.isBestseller = book.bestseller;
    if (book.description) bookClass.description = book.description;
    if (book.image) bookClass.image = book.image;
    if (book.publisher) bookClass.publisher = book.publisher;
    if (book.published) bookClass.published = new Date(book.published);

    return bookClass;
};