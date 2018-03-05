'use strict';

const Journal = require('../../../../domain/models/documents/Journal');
const Article = require('./ArticleModelToClass');
const Author = require('./AuthorModelToClass');
const JournalInstance = require('./DocumentInstanceModelToClass');

module.exports = journal => {
    if (!journal) {
        return null;
    }

    let authors = [];
    if (journal.issue.authors) {
        journal.issue.authors.forEach(aut => {
            let author = Author(aut);

            authors.push(author);
        });
    }

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

    let jou = new Journal(journal.title, journal.id, journal._id, authors, journal.cost,
        journal.edition, journal.issn, journal.keywords);

    jou.articles = articles;
    jou.instances = instances;
    if (journal.bestseller != null || journal.bestseller !== undefined) jou.isBestseller = journal.bestseller;
    if (journal.description) jou.description = journal.description;
    if (journal.image) jou.image = journal.image;
    if (journal.publisher) jou.publisher = journal.publisher;
    if (journal.issue.date) jou.published = journal.issue.date;

    return jou;
};