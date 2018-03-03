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

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');
const Author = require('../../domain/models/documents/Author').models.mongo;

/**
 * CRUD functions
 * @private
 */

async function get(id = null, fields = null, count = 1) {
    if (id) {
        return await Author.findOne({
            $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
        }, err => {
            if (err) console.log(err);
            // found!
        }).exec();
    }
    else if (query) {
        let authors = await Author.find(query, err => {
            if (err) console.log(err);
            // found!
        }).exec();

        if (authors && count === 1) {
            return authors[0];
        } else if (authors && count !== -1) {
            return authors.slice(0, count);
        } else {
            return authors;
        }
    } else {
        return null;
    }
}

async function update(id, query) {
    let author = await get(id);

    if (!author) {
        return null;
    }

    if (query.first_name) author.first_name = query.first_name;
    if (query.last_name) author.last_name = query.last_name;
    if (query.birth_date) author.birth_date = query.birth_date;
    if (query.death_date) author.death_date = query.death_date;

    return await author.save(err=>{
        if (err) console.log(err);
        // saved!
    });
}

async function create(query) {
    let author = await Author.create({
        first_name: query.first_name,
        last_name: query.last_name,
        birth_date: query.birth_date,
        death_date: query.death_date
    }, err => {
        if (err) console.log(err);
        // created!
    });
    return author;
}

async function remove(id) {
    let author = await get(id);
    if (author) {
        await Author.remove({_id: author._id}, err => {
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