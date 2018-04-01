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
module.exports.searchExact = searchExact;
module.exports.findOrCreate = findOrCreate;
module.exports.maxId = () => realm.objects('Author').max('id') || 0;


/**
 * Module dependencies
 * @private
 */

const defaultFields = require('../../util/config').DEFAULT_AUTHOR_RESPONSE_FIELDS;
const realm = require('../db').realm;
const Author = require('../../domain/models/documents/Author');


/**
 * CRUD functions
 * @private
 */

async function get(id) {
    return realm.objectForPrimaryKey('Author', id);
}


/**
 * Searches for the authors which match the criterion
 * @param query {*} A JSON. Every resulting object will contain the specified fields with specified values.<br>
 *      E.g. passing <code>{first_name: 'John'}</code>
 *      will result in all authors with first name of 'John'
 * @return {Realm.Results<Author>}
 */

function searchExact(query) {
    let searchFields = [], searchParams = [];

    // Validate fields
    for (let item in query) {
        if (query.hasOwnProperty(item) && defaultFields.includes(item)) {
            searchFields.push(item);
            searchParams.push(query[item])
        }
    }

    if (searchFields.length) {
        let searchQuery = searchFields[0] + ' == $0';

        for (let i = 1; i < searchFields.length; i++) {
            searchQuery += ' AND ' + searchFields[i] + ' == $' + i
        }

        return realm.objects('Author')
            .filtered(searchQuery, ...searchParams);

    } else return realm.objects('Author');
}

function findOrCreate(query) {
    let author = searchExact(query);
    if (author.length) return author[0];
    else return create(query)
}

// TODO
async function update(author) {
    // let authorModel = AuthorModel(author);
    //
    // await AuthorDB.findByIdAndUpdate(author.innerId, authorModel);
    //
    // return author;
}

function create(query) {
    query.id = realm.objects('Author').max('id') + 1 || 0;
    realm.write(() => {
        realm.create('Author', query);
    });

    return realm.objectForPrimaryKey('Author', query.id);
}

async function remove(id) {
    let author = await get(id);
    if (author) {
        realm.write(() => {
            realm.delete(author);
        });

        return true;
    }
    return false;
}