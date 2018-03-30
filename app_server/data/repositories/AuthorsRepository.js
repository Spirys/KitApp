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

// const AuthorDB = require('../models/documents/Author');
// const AuthorClass = require('../converters/model_to_class/documents/AuthorModelToClass');
// const AuthorModel = require('../converters/class_to_model/documents/AuthorClassToModel');

const config = require('../../util/config');
const errors = config.errors;
const Realm = require('realm');
const Author = require('../../domain/models/documents/Author');
const Book = require('../../domain/models/documents/Book');
const Journal = require('../../domain/models/documents/Journal');
const Media = require('../../domain/models/documents/Media');
const Article = require('../../domain/models/documents/Article');

let realm;

async function init() {
    realm = await Realm.open({
        sync: {
            url: `realms://${config.realm.url}/~/documents`,
            user: Realm.Sync.User.current
        },
        schema: [Author]
    });
}

async function check_init() {
    if (realm === undefined || realm.isClosed) {
        await init();
    }
}

/**
 * CRUD functions
 * @private
 */

async function get(id) {
    await check_init();
    let author = realm.objectForPrimaryKey('Author', id);

    return author;
}

// TODO
async function search(query) {
    // let authors = await AuthorDB.find(query).exec();
    //
    // let authorClasses = [];
    // authors.forEach(aut => {
    //     authorClasses.push(AuthorClass(aut));
    // });
    //
    // return authorClasses;
}

// TODO
async function update(author) {
    // let authorModel = AuthorModel(author);
    //
    // await AuthorDB.findByIdAndUpdate(author.innerId, authorModel);
    //
    // return author;
}

async function create(query) {
    await check_init();
    let author;
    realm.write(() => {
        let id = realm.objects('Author').max('id') + 1 || 0;
        author = realm.create('Author', {
            id: id,
            first_name: query.first_name,
            last_name: query.last_name,
            middle_name: query.middle_name,
            birth_date: query.birth_date,
            death_date: query.death_date
        });
    });
    return author;
}

async function remove(id) {
    await check_init();
    let author = await get(id);
    if (author) {
        realm.write(() => {
            realm.delete(author);
        });

        return true;
    }
    return false;
}