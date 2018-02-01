'use strict';
const auth = require('../auth');
const DocumentsRepository = require('../../repository/DocumentsRepository');
const config = require('../../config/config');

function error(message) {
    return {code: config.errorCode, message: message};
}

/**
 * Returns the first <i>n</i> books from database.
 * Default value of <i>n</i> is 25.
 * Can be specified via <code>length</code> parameter in request.
 * @param req Request.
 *  Must include valid <code>token</code> parameter.
 *  <p>Can include <code>length</code> and <code>page</code> parameters.</p>
 * @param res
 */
module.exports.all = function (req, res) {
    auth.verifySession(req.query.token, function () {
        const length = (req.query.length) ? req.query.length : config.defaultPageLength;
        const page = (req.query.page) ? req.query.page : 1;
        const next = function (books) {
            res.send({code: config.okCode, page, length: books.length, results: books});
        };
        DocumentsRepository.getAllBooks(length, page, next);
    }, function () {
        res.status(403);
        res.send(error(config.invalidToken));
    })

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
