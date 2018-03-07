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

    art.published = (article.published) ? article.published : undefined;

    return art;
};