'use strict';
const Book = require('../../models/documents/Book');

module.exports.all = function (req, res) {

};

module.exports.search = function (req, res) {

};

module.exports.getById = function (req, res) {

};

module.exports.create = function (req, res) {

};

module.exports.delete = function (req, res) {

};
// 1. /all — returns the first 25 books from the db
// 2. /search
//
// 1. ?name=name — returns the first 25 books which have this name
// 2. ?author=author — returns the first 25 books which have this author
// 3. POST — creates the book
//
// 1. Required fields
//
// 1. name=name
// 2. authors=authors
// 3. publisher=publisher
// 4. edition=edition
// 4. /:id
//
// 1. GET — returns the book
//
// 1. name=b
// 2. authors=b
// 3. id=b
// 4. lendings=b
// 5. publisher=b
// 6. edition=b
// 7. Where b=0 — excludes field, b=1 includes field
// 2. POST — checks this book out or adds a user to query
// 3. PUT — updates information
// 4. DELETE — removes the book
// 5. Additional
//
// 1. page=n — specifies the page
// 2. length=n — specifies the number of elements on the page
//
