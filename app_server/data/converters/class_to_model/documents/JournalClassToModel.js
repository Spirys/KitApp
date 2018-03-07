'use strict';

const Article = require('./ArticleClassToModel');
const Author = require('./AuthorClassToModel');
const JournalInstance = require('./DocumentInstanceClassToModel');

module.exports = journal => {
    let authors = [];
    journal.authors.forEach(aut => {
        let author = Author(aut);

        authors.push(author);
    });

    let instances = [];
    journal.instances.forEach(inst => {
        let instance = JournalInstance(inst);

        instances.push(instance);
    });

    let articles = [];
    journal.articles.forEach(art => {
        let article = Article(art);

        articles.push(article);
    });

    let jou = {
        _id: journal.innerId,
        title: journal.title,
        issue: {
            authors: authors
        },
        cost: journal.cost,
        edition: journal.edition,
        issn: journal.issn,
        keywords: journal.keywords,
        articles: articles,
        instances: instances
    };

    jou.bestseller = (journal.isBestseller != null || journal.isBestseller !== undefined) ? journal.isBestseller : undefined;
    jou.description = (journal.description) ? journal.description : undefined;
    jou.image = (journal.image) ? journal.image : undefined;
    jou.publisher = (journal.publisher) ? journal.publisher : undefined;
    jou.issue.date = (journal.published) ? journal.published : undefined;

    return jou;
};