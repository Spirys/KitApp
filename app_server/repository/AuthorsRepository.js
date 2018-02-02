'use strict';
const Author = require('../models/documents/Author');

/**
 * Gets the existing author {@link ObjectId}
 * @param author An object containing following fields:
 * <ul>
 *     <li>first_name</li>
 *     <li>last_name</li>
 * </ul>
 * @param next
 * @param onError
 * @returns {string}
 */
function getAuthor(author, next, onError) {
    Author.findOne({first_name: author.first_name, last_name: author.last_name}, function (err, author) {
        if (err) {
            onError();
        } else if (!author || typeof author === 'undefined') {
            let fields = new Author({
                first_name: author.first_name,
                last_name: author.last_name,
                birth_date: author.birth_date,
                death_date: author.death_date
            });

            Author.create(fields, function (err, newAuthor) {
                if (err) {
                    onError();
                } else {
                    return next(newAuthor);
                }
            });
        } else {
            next(author);
        }
    });
}

module.exports.getAuthor = getAuthor;

module.exports.getAuthors = function (authors, next, onError) {
    if (Array.isArray(authors)) {
        let authorIds = [];
        for (let author in authors) {
            if (authors.hasOwnProperty(author) && author && author !== null) {
                getAuthor(author, function (author) {
                    authorIds.push(author);
                }, onError)
            }
        }
        return authorIds;
    } else if (authors.hasOwnProperty('first_name') && authors.hasOwnProperty('last_name')) {
        return getAuthor(authors, next, onError);
    } else {
        onError();
    }
};