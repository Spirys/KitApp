/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

// TODO: add error handlers

'use strict';

/**
 * Module exports
 * @public
 */

module.exports.create = create;
module.exports.read = get;
module.exports.get = get;
module.exports.update = update;
module.exports.delete = remove;
module.exports.remove = remove;

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');
const Journal = require('../models/documents/Journal').models.mongo;
const Article = require('../models/documents/Article').models.mongo;
const JournalInstance = require('../models/documents/DocumentInstance').models.mongo.journal;
const AuthorRepo = require('./AuthorsRepository');

/**
 * CRUD functions
 * @private
 */

async function get(id = null, query = null, count = 1) {
    if (id) {
        return await Journal.findOne({
            $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
        }, err => {
            if (err) console.log(err);
            // found!
        }).populate('instances')
            .populate('authors')
            .populate('articles')
            .exec();
    }
    else if (query) {
        let journals = await Journal.find(query, err => {
            if (err) console.log(err);
            // found!
        }).populate('instances')
            .populate('authors')
            .populate('articles')
            .exec();

        if (journals && count === 1) {
            return journals[0];
        } else if (journals && count !== -1) {
            return journals.slice(0, count);
        } else {
            return journals;
        }
    }
    else {
        return null;
    }
}

// FIXME: MAKE BETTER!!!!
async function update(id, query) {
    let journal = await get(id);

    if (!journal) {
        return null;
    }

    if (query.title) journal.title = query.title;
    if (query.bestseller) journal.bestseller = query.bestseller;
    if (query.cost) journal.cost = query.cost;
    if (query.publisher) journal.publisher = query.publisher;
    if (query.issn) journal.issn = query.issn;
    if (query.keywords) journal.keywords = query.keywords;
    if (query.description) journal.description = query.description;
    if (query.image) journal.image = query.image;

    // issue, articles
    if (query.issue) {
        journal.issue.date = query.issue.date;

        let editors = [];
        // add editors
        for (let i = 0; i < query.issue.editors.length; i++) {
            let editor = await AuthorRepo.get(null, query.issue.editors[i]);
            if (!editor) {
                editor = await AuthorRepo.create(query.issue.editors[i]);
            }
            editors.push(editor);
        }
        journal.issue.editors = editors;
    }

    if (query.articles) {
        // add articles
        let articles = [];
        for (let i = 0; query.articles.length; i++) {
            let article = await Article.create({
                name: query.articles[i].name,
                authors: [],
                published: query.articles[i].published
            }, err => {
                if (err) console.log(err);
                // created!
            });

            // add authors
            for (let j = 0; j < query.articles[i].authors.length; j++) {
                let author = await AuthorRepo.get(null, query.articles[i].authors[j]);
                if (!author) {
                    author = await AuthorRepo.create(query.articles[i].authors[j]);
                }
                article.authors.push(author);
            }
            articles.push(article);
        }
        journal.articles = articles;
    }

    return await journal.save(err => {
        if (err) console.log(err);
        // saved!
    });
}

async function create(query) {
    let journal = await get(null, query);

    if (!journal) {
        journal = {
            title: query.title,
            issue: {
                editors: [],
                date: query.date
            },
            articles: [],
            instances: [],
            cost: query.cost,
            publisher: query.publisher,
            keywords: query.keywords,
            bestseller: query.bestseller,
            description: query.description,
            issn: query.isbn,
            image: query.image
        };

        let addOrCreateAuthors = async (to, from) => {
            for (let i = 0; i < from.length; i++) {
                let tmp = await AuthorRepo.get(null, from[i]);
                if (!tmp) {
                    tmp = await AuthorRepo.create(from[i]);
                }
                to.push(tmp);
            }
        };

        // add editors
        addOrCreateAuthors(journal.issue.editors, query.issue.editors);

        // add articles
        for (let i = 0; query.articles.length; i++) {
            let article = await Article.create({
                name: query.articles[i].name,
                authors: [],
                published: query.articles[i].published
            }, err => {
                if (err) console.log(err);
                // created!
            });

            // add authors
            addOrCreateAuthors(article.authors, query.articles[i].authors);
            journal.articles.push(article);
        }

        journal = await Journal.create(journal, err => {
            if (err) console.log(err);
            // created!
        });
    }

    if (query.available) {
        for (let i = 0; i < query.available; i++) {
            let instance = await createInstance('Available', journal);
            journal.instances.push(instance);
        }
    }

    if (query.reference) {
        for (let i = 0; i < query.reference; i++) {
            let instance = await createInstance('Reference', journal);
            journal.instances.push(instance);
        }
    }

    if (query.maintenance || 1) {
        let count = query.maintenance ? query.maintenance : 1;
        for (let i = 0; i < count; i++) {
            let instance = await createInstance('Maintenance', journal);
            journal.instances.push(instance);
        }
    }

    return await journal.save(err => {
        if (err) console.log(err);
        // saved!
    });
}

async function remove(id) {
    let journal = await get(id);
    if (journal) {
        await Journal.remove({_id: journal._id}, err => {
            if (err) {
                console.log(err);
                return false;
            }
            // removed!
        });

        return true;
    }
    return false;
}

async function createInstance(status, journal) {
    let instance = await JournalInstance.create({
        status: status,
        document: {
            kind: 'Journal',
            doc: journal
        }
    }, err => {
        if (err) console.log(err);
        // created!
    });

    return instance;
}

// FIXME: delete or make better
async function createArticle() {

}