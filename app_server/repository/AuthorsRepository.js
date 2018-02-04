'use strict';
const Author = require('../models/documents/Author');
const config = require('../config/config');

/**
 * Gets the existing author {@link ObjectId}
 * <ul>
 *     <li>first_name</li>
 *     <li>last_name</li>
 * </ul>
 * @returns {string}
 * @param anAuthor
 */
module.exports.getAuthor = async function (anAuthor) {
    try {
        let author = await Author.findOne({first_name: anAuthor.first_name, last_name: anAuthor.last_name});
        if (!author || typeof author === 'undefined' || author === null) {
            let fields = new Author({
                first_name: anAuthor.first_name,
                last_name: anAuthor.last_name,
                birth_date: anAuthor.birth_date,
                death_date: anAuthor.death_date
            });

            author = await Author.create(fields);
        }
        return author;
    } catch (err) {
        return {code: config.errorCode}
    }
};

module.exports.getAuthors = async function (authors) {
    if (Array.isArray(authors)) {
        let newAuthors = [];
        for (let i in authors) {
            let author = authors[i];
            if (authors.hasOwnProperty(i) && author && author !== null) {
                newAuthors.push(await exports.getAuthor(author));
            }
        }
        return newAuthors;
    } else if (authors.hasOwnProperty('first_name') && authors.hasOwnProperty('last_name')) {
        return await exports.getAuthor(authors);
    }
};