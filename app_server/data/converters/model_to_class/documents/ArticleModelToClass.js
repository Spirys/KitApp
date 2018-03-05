'use strict';

const Article = require('../../../../domain/models/documents/Article');
const Author = require('./AuthorModelToClass');

module.exports = article => {
    if (!article) {
        return null;
    }

    let authors = [];
    if (article.authors) {
        article.authors.forEach(aut => {
            let author = Author(aut);

            authors.push(author);
        });
    }

    let art = new Article(article.name, authors, article.id, article._id);

    if (article.published) art.published = article.published;

    return art;
};