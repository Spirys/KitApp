/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module exports
 * @public
 */

module.exports.create = create;
module.exports.read = get;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = remove;
module.exports.remove = remove;

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');

/**
 * CRUD functions
 * @private
 */

function get() {

}

function getAll(page, length, fields) {
    return [{
        id: 111,
        authors: [{
            first_name: 'Bertrand',
            last_name: 'Meyer',
            birth_date: '21-11-1950'
        }],
        bestseller: false,
        cost: 5000,
        image: 'https://images-na.ssl-images-amazon.com/images/I/51PjaTyA64L._SX378_BO1,204,203,200_.jpg',
        instances: [{
            id: 112,
            status: 'Available'
        },
            {
                id: 114,
                status: 'Reference'
            },
            {
                id: 115,
                status: 'Loaned'
            }],
        title: 'Touch of Class: Learning to Program Well with Objects and Contracts',
        edition: '1st ed. 2009',
        publisher: 'Springer',
        keywords: ['Touch of class', 'OOP', 'Meyer', 'Safety', 'Design', 'Contracts']
    }]
}

function update() {

}

function create() {

}

function remove() {

}