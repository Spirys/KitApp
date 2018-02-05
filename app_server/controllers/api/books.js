'use strict';
const auth = require('../auth');
const DocumentsRepository = require('../../repository/DocumentsRepository');
const config = require('../../config/config');
const validator = require('../../util/validator');

/*
    Todo: create reusable function for generating message with an error
    Todo: create reusable function for session checks (use validator)
 */

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

async function createDocument(query) {
    const requiredFields = config.requiredDocumentFields;

    for (let i in config.documentTypes) {
        let type = config.documentTypes[i];
        if (query[type]) {
            let missing = validator.validateFields(query[type], requiredFields[type]);
            if (!(missing.length === 0)) {
                return {code: config.errorCode, message: config.missingRequired, missing: missing}
            } else {
                return await DocumentsRepository.createDocument(query);
            }
        }
    }
    return {code: config.unknownDocument};
}

async function checkOutDocument(query) {
    try {

    } catch (err) {
        //res.status(403).json(config.)
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
            let books = await DocumentsRepository.getAllBooks(length, page);
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

module.exports.create = async function (req, res) {
    try {
        let sessionResponse = await auth.verifyToken(req.body.token);
        if (sessionResponse.code === config.okCode) {
            let book = await createDocument(req.body);
            if (book.code && book.code !== config.okCode) {
                res.status(400).json(book);
                return;
            }
            let instances = [];
            for (let i = 0; i < book.instances.length; i++) {
                let tmp = book.instances[i];
                instances.push({
                    id: tmp.id,
                    status: tmp.status,
                    due_back: tmp.due_back
                });
            }
            let response = {
                id: book.id,
                authors: book.authors,
                cost: book.cost,
                image: book.image,
                instances: instances,
                title: book.title,
                edition: book.edition,
                publisher: book.publisher,
                keywords: book.keywords
            };
            res.json(response);
        } else {
            res.status(403).json(error(config.invalidToken));
        }
    } catch (err) {
        console.log(err);
        res.status(403).json(error(config.invalidToken));
    }
};

module.exports.delete = function (req, res) {

};

module.exports.checkOut = async function (req, res) {
    try {
        let sessionResponse = await auth.verifySession(req.body.token);
        if (sessionResponse.code === config.okCode){
            let checkOut = checkOutDocument();
            res.json(checkOut);
        } else {
            res.status(403).json(error(config.invalidToken));
        }
    } catch (err) {
        console.log(err);
        res.status(403).json(error(config.invalidToken));
    }
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