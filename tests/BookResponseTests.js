/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const BookResponse = require('../app_server/presentation/composers/ResponseComposer').book;
const config = require('../app_server/util/config');

/**
 * Tests
 * @private
 */

const test1 = {
    books: [{
        id: 111,
        authors: [{
            first_name: 'Bertrand',
            last_name: 'Meyer',
            birth_date: '21-11-1950'
        }],
        isBestseller: false,
        cost: 5000,
        image: 'https://images-na.ssl-images-amazon.com/images/I/51PjaTyA64L._SX378_BO1,204,203,200_.jpg',
        instances: [{
            id: 112,
            status: 'Available'
        }, {
            id: 114,
            status: 'Reference'
        }, {
            id: 115,
            status: 'Loaned'
        }],
        title: 'Touch of Class: Learning to Program Well with Objects and Contracts',
        edition: '1st ed. 2009',
        publisher: 'Springer',
        keywords: ['Touch of class', 'OOP', 'Meyer', 'Safety', 'Design', 'Contracts']
    }],
    fields: config.DEFAULT_BOOK_RESPONSE_FIELDS,
    page: 1,
    length: 25,
    locale: 'en',
    err: null
};

let test2 = Object.create(test1);
test2.fields = ['id', 'bestseller', 'cost', 'keywords'];

let test3 = Object.create(test1);
test3.fields = ['best', 'cost', 'keywords'];

let test4 = Object.create(test2);
test4.err = config.errors.WRONG_LOGIN_PASSWORD;
test4.locale = 'ru';

let test5 = Object.create(test1);
// delete test5.books[0].bestseller; // Uncomment to test
test5.fields = ['id', 'bestseller', 'cost', 'keywords'];

let test6 = Object.create(test4);
test6.err = config.errors.ERROR1;
delete test6.locale;

let current = test3;
let r = BookResponse.formatMultiple(current.books, current.fields, current.page, current.length, current.locale, current.err);

console.debug(r);