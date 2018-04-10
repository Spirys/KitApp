/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

// TODO: add error handlers

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');

// const MediaDB = require('../models/documents/Media');
// const MediaInstanceDB = require('../models/documents/DocumentInstance');
// const UserDB = require('../models/users/Patron');
//
// const AuthorRepo = require('./AuthorsRepository');
// const UserRepo = require('./UsersRepository');
//
// const MediaClass = require('../converters/model_to_class/documents/MediaModelToClass');
// const AuthorClass = require('../../domain/models/documents/Author');
// const MediaInstanceClass = require('../converters/model_to_class/documents/DocumentInstanceModelToClass');
// const UserClass = require('../../domain/models/users/User');
//
// const MediaModel = require('../converters/class_to_model/documents/MediaClassToModel');
// const MediaInstanceModel = require('../converters/class_to_model/documents/DocumentInstanceClassToModel');

const realm = require('../db').realm;
const Media = require('../../domain/models/documents/Media');
const Author = require('../../domain/models/documents/Author');

/**
 * CRUD functions
 * @private
 */

async function get(id) {
    let media = realm.objectForPrimaryKey('Media', id);

    if (!media) {
        return {err: config.errors.DOCUMENT_NOT_FOUND}
    }

    return media;
}

// TODO
async function search(query) {
    // let medias = await MediaDB.find(query)
    //     .populate('authors')
    //     .populate('instances')
    //     .exec();
    //
    // let mediaClasses = [];
    // for (let i = 0; i < medias.length; i++) {
    //     let b = medias[i];
    //
    //     for (let j = 0; j < b.instances.length; j++) {
    //         if (b.instances[j].taker) {
    //             await UserDB.populate(b.instances[j], {
    //                 path: 'taker'
    //             });
    //         }
    //     }
    //     mediaClasses.push(MediaClass(b));
    // }
    //
    // return mediaClasses;
}

async function getAll(page, length) {
    return realm.objects('Media').slice((page - 1) * length + 1, length + 1);
}

// TODO
async function updateMedia(media) {
    // let mediaModel = MediaModel(media);
    //
    // await MediaDB.findByIdAndUpdate(media.innerId, mediaModel).exec();
    //
    // return media;
}

async function create(query) {
    let media;

    // Set defaults if instance parameters are missing
    let available, reference, maintenance;

    available = (query.available)
        ? typeof query.available === 'number' ? query.available : 0
        : (query.reference || query.maintenance) ? 0 : 1;

    reference = (query.reference)
        ? typeof query.reference === 'number' ? query.reference : 0
        : (available || query.maintenance) ? 0 : 1;

    maintenance = (query.maintenance)
        ? typeof query.maintenance === 'number' ? query.maintenance : 0
        : (available || reference) ? 0 : 1;

    let medias = realm.objects('Media')
        .filtered('title == $0', query.title);

    realm.write(() => {
        if (medias.length === 0) {
            let id = realm.objects('Media').max('id') + 1 || 0;
            media = realm.create('Media', {
                id: id,
                title: query.title,
                // authors: [],
                // instances: [],
                cost: query.cost,
                keywords: query.keywords,
                bestseller: query.bestseller,
                description: query.description,
                image: query.image,
                published: query.published
            });

            let autId = realm.objects('Author').max('id') + 1 || 0;
            let authors = realm.objects('Author');

            for (let i = 0; i < query.authors; i++) {
                let author = authors.filtered('first_name == $0 AND last_name == $1',
                    query.authors[i].first_name, query.authors[i].last_name);

                if (author.length === 0) {
                    media.authors.push({
                        id: autId,
                        first_name: query.first_name,
                        last_name: query.last_name,

                        middle_name: query.middle_name,
                        birth_date: query.birth_date,
                        death_date: query.death_date
                    });
                    autId++;
                } else {
                    media.authors.push(author[0]);
                }
            }
        } else {
            media = medias[0];
        }

        let instId = realm.objects('MediaInstance').max('id') + 1 || 0;
        for (let i = 0; i < available; i++) {
            media.instances.push({
                id: instId,
                status: 'Available'
            });
            instId++;
        }

        for (let i = 0; i < reference; i++) {
            media.instances.push({
                id: instId,
                status: 'Reference'
            });
            instId++;
        }

        for (let i = 0; i < maintenance; i++) {
            media.instances.push({
                id: instId,
                status: 'Maintenance'
            });
            instId++;

        }
    });

    // FIXME Incorrect usage of callback!
    return media;
}

/**
 * Asynchronously adds instances to the media
 * @param media {Media} The media where to add copies
 * @param available {number} how many available copies to add
 * @param reference {number} how many reference copies
 * @param maintenance {number} how many maintenance copies
 * @return {Promise<Media>} the media with changed fields
 */

async function addInstances(media, available, reference, maintenance) {
    let id = realm.objects('MediaInstance').max('id') + 1 || 0;

    // TODO Single transaction
    for (let i = 0; i < available; i++) {
        realm.write(() => {
            media.instances.push({
                id: id,
                status: 'Available'
            });
        });
        id++;
    }

    for (let i = 0; i < reference; i++) {
        realm.write(() => {
            media.instances.push({
                id: id,
                status: 'Reference'
            });
        });
        id++;
    }

    for (let i = 0; i < maintenance; i++) {
        realm.write(() => {
            media.instances.push({
                id: id,
                status: 'Maintenance'
            });
        });
        id++;
    }

    return media;
}

async function remove(id) {
    let media = await get(id);
    if (media.err) return {err: media.err};

    realm.write(() => {
        realm.delete(media.instances);
        realm.delete(media);
    });

    return media;
}

async function createInstance(status) {await check_init();
    let instance;
    realm.write(() => {
        instance = realm.create('MediaInstance', {
            status: status
        });
    });

    // FIXME Incorrect usage of callback
    return instance;
}

// TODO
async function updateInstance(instance) {
    // let instanceModel = MediaInstanceModel(instance);
    //
    // await MediaInstanceDB.findByIdAndUpdate(instance.innerId, instanceModel).exec();
    //
    // return instance;
}

async function removeInstance(instance) {
    await check_init();

    realm.write(() => {
        realm.delete(instance);
    });

    return true;
}

/**
 * Module exports
 * @public
 */

module.exports.create = create;
module.exports.read = get;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.update = updateMedia;
module.exports.updateInstance = updateInstance;
module.exports.delete = remove;
module.exports.remove = remove;