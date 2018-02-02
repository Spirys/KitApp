'use strict';
const auth = require('../auth');
const DocumentsRepository = require('../../repository/DocumentsRepository');
const config = require('../../config/config');
const validator = require('../../util/validator');

/**
 * Builds an error with given message
 * @param error
 * @return {*}
 */
function error(error) {
    if (error.hasOwnProperty('message')) {
        error.code = config.errorCode;
        return error;
    } else {
        return {code: config.errorCode, message: error};
    }
}

async function createDocument(query, next, onError) {
    const requiredFields = config.requiredDocumentFields;

    for (let type in config.documentTypes){
        if (query[type]) {
            let missing = validator.validateFields(query[type], requiredFields[type]);
            if (!(missing.length === 0)) {
                onError({message: config.missingRequired, missing})
            } else {
                DocumentsRepository.create();
            }
            break;
        }
    }
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
module.exports.all = async function (req, res) {
    try {
        let sessionResponse = await auth.verifySession(req.query.token);
        if (sessionResponse.code === config.okCode) {
            const length = (req.query.length) ? req.query.length : config.defaultPageLength;
            const page = (req.query.page) ? req.query.page : 1;
            const next = function (books) {
                res.json({code: config.okCode, page, length: books.length, results: books});
            };
            let books = await DocumentsRepository.getAllBooks(length, page, next);
            next(books);
        } else {
            throw new Error();
        }
    } catch(err) {
        res.status(403).json(error(config.invalidToken));
    }
};

module.exports.search = function (req, res) {

};

module.exports.getById = function (req, res) {

};

module.exports.create = function (req, res) {
    auth.verifySession(req.query.token, function () {
        createDocument(req.query, function (response) {

        }, function (err) {

        })
    }, function (err) {
        res.send(error(err));
    })
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