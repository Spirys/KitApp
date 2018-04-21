/*
 * Copyright (c) 2018 KitApp project
 * Author: Marsel Shaihin
 */

/**
 * Module dependencies
 * @private
 */

const val = require('../app_server/domain/validation/InputValidation');
const rules = require('../app_server/domain/validation/Rules').book;

/**
 * Utility functions
 * @private
 * @author user633183
 */

const arrayEqual = ([x, ...xs], [y, ...ys]) =>
    x === undefined && y === undefined
        ? true
        : x === y && arrayEqual(xs, ys);

/**
 * Test on correct data
 * @private
 */

const test1 = val.validate({
    title: 'Example',
    authors: ['John Doe', 'Eva Adams'],
    cost: 1000,
    edition: 'Second revision',
    publisher: 'INNO books',
    keywords: ['example', 'keywords'],
    description: 'Just an example book',
    available: 5,
    reference: 1,
    image: 'https://example.com/imgs/inno.png',
    published: '01-03-2018'

}, rules);

console.log(`Result of test1: ${test1 === true ? 'PASS' : 'FAIL'}`);

/**
 * Test on extraneous data
 * @private
 */

const test2 = val.validate({
    token: 'librarianToken',
    title: 'Example',
    authors: ['John Doe', 'Eva Adams'],
    cost: 1000,
    edition: 'Second revision',
    publisher: 'INNO books',
    keywords: ['example', 'keywords'],
    description: 'Just an example book',
    available: 5,
    reference: 1,
    image: 'https://example.com/imgs/inno.png',
    published: '01-03-2018'

}, rules);

console.log(`Result of test2: ${arrayEqual(test2.extra, ['token']) ? 'PASS' : 'FAIL'}`);

/**
 * Test on incorrect data
 * @private
 */

const test3 = val.validate({
    title: 1234,
    authors: [],
    cost: 'thousand',
    edition: 234,
    publisher: () => undefined,
    keywords: 'wrong keywords',
    description: 0,
    available: -5,
    reference: NaN,
    image: 'http://example.com/imgs/inno.png',
    published: '01.03.2018'

}, rules);

console.log(`Result of test3: ${
    arrayEqual(test3.wrong, ['title', 'authors', 'cost', 'edition',
        'publisher', 'published', 'keywords', 'description',
        'available', 'reference', 'image'])
        ? 'PASS'
        : 'FAIL'
    }`);

/**
 * Test on missing data
 * @private
 */

const test4 = val.validate({
    authors: ['John Doe', 'Eva Adams'],
    cost: 1000,
    edition: 'Second revision',
    publisher: 'INNO books',
    description: 'Just an example book',
    image: 'https://example.com/imgs/inno.png',
    published: '01-03-2018'

}, rules);

console.log(`Result of test4: ${
    arrayEqual(test4.missing, ['title', 'keywords']) ? 'PASS' : 'FAIL'
    }`);