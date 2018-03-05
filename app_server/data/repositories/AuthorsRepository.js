/*!
 * Authors repository
 * Copyright(c) 2018 Marsel Shaihin
 */

// TODO: add error handles

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
module.exports.search = search;

/**
 * Module dependencies
 * @private
 */

const AuthorDB = require('../models/documents/Author');
const AuthorClass = require('../converters/model_to_class/documents/AuthorModelToClass');
const AuthorModel = require('../converters/class_to_model/documents/AuthorClassToModel');

/**
 * CRUD functions
 * @private
 */

async function get(id) {
    let author = await AuthorDB.findOne({
        $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
    }).exec();

    return AuthorClass(author);
}

async function search(query) {
    let authors = await AuthorDB.find(query).exec();

    let authorClasses = [];
    authors.forEach(aut => {
        authorClasses.push(AuthorClass(aut));
    });

    return authorClasses;
}

async function update(author) {
    let authorModel = AuthorModel(author);

    await AuthorDB.findByIdAndUpdate(author.innerId, authorModel);

    return author;
}

async function create(query) {
    let author = await AuthorDB.create({
        first_name: query.first_name,
        last_name: query.last_name,
        birth_date: query.birth_date,
        death_date: query.death_date
    });
    return AuthorClass(author);
}

async function remove(id) {
    let author = await get(id);
    if (author) {
        await AuthorDB.remove({_id: author.innerId});

        return true;
    }
    return false;
}