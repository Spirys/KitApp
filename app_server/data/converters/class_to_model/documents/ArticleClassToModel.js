'use strict';

const Author = require('./AuthorClassToModel');

module.exports = article => {
    let authors = [];
    if (article.authors) {
        article.authors.forEach(aut => {
            let author = Author(aut);

            authors.push(author);
        });
    }

    let art = {
        _id: article.innerId,
        name: article.name,
        authors: authors
    };

    if (article.published) art.published = article.published;

    return art;
};