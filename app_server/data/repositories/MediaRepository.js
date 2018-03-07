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

const MediaDB = require('../models/documents/Media');
const MediaInstanceDB = require('../models/documents/DocumentInstance');
const UserDB = require('../models/users/Patron');

const AuthorRepo = require('./AuthorsRepository');
const UserRepo = require('./UsersRepository');

const MediaClass = require('../converters/model_to_class/documents/MediaModelToClass');
const AuthorClass = require('../../domain/models/documents/Author');
const MediaInstanceClass = require('../converters/model_to_class/documents/DocumentInstanceModelToClass');
const UserClass = require('../../domain/models/users/Patron');

const MediaModel = require('../converters/class_to_model/documents/MediaClassToModel');
const MediaInstanceModel = require('../converters/class_to_model/documents/DocumentInstanceClassToModel');

/**
 * CRUD functions
 * @private
 */

async function get(id) {

    const query = {
        $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
    };

    let media = await MediaDB.findOne(query)
        .populate('instances')
        .populate('authors')
        .exec();

    if (!media) {
        return {err: config.errors.DOCUMENT_NOT_FOUND}
    }

    if (media.instances) {
        for (let i = 0; i < media.instances.length; i++) {
            if (media.instances[i].taker) {
                await UserDB.populate(media.instances[i], {
                    path: 'taker'
                });
            }
        }
    }

    return MediaClass(media);
}

async function search(query) {
    let medias = await MediaDB.find(query)
        .populate('authors')
        .populate('instances')
        .exec();

    let mediaClasses = [];
    for (let i = 0; i < medias.length; i++) {
        let b = medias[i];

        for (let j = 0; j < b.instances.length; j++) {
            if (b.instances[j].taker) {
                await UserDB.populate(b.instances[j], {
                    path: 'taker'
                });
            }
        }
        mediaClasses.push(MediaClass(b));
    }

    return mediaClasses;
}

async function getAll(page, length) {
    let medias = await MediaDB.find()
        .skip((page - 1) * length)
        .limit(length)
        .populate('authors')
        .populate('instances')
        .exec();

    let mediaClasses = [];
    for (let i = 0; i < medias.length; i++) {
        let b = medias[i];

        for (let j = 0; j < b.instances.length; j++) {
            if (b.instances[j].taker) {
                await UserDB.populate(b.instances[j], {
                    path: 'taker'
                });
            }
        }
        mediaClasses.push(MediaClass(b));
    }

    return mediaClasses;
}

async function updateMedia(media) {
    let mediaModel = MediaModel(media);

    await MediaDB.findByIdAndUpdate(media.innerId, mediaModel).exec();

    return media;
}

// TODO Place logic into the interactor
async function create(query) {
    // TODO: add better search
    let media = await search({
        title: query.title,
    });

    if (media.length === 0) {
        let mediaDb = await MediaDB.create({
            title: query.title,
            authors: [],
            instances: [],
            cost: query.cost,
            keywords: query.keywords,
            bestseller: query.bestseller,
            description: query.description,
            image: query.image,
            published: query.published
        });

        media = MediaClass(mediaDb);

        let authors = [];
        for (let i = 0; i < query.authors.length; i++) {
            let author = await AuthorRepo.search(query.authors[i]);
            if (author.length === 0) {
                author = await AuthorRepo.create(query.authors[i]);
            } else {
                author = author[0];
            }
            authors.push(author);
        }
        media.authors = authors;
    } else {
        media = media[0]
    }

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

    await addInstances(media, available, reference, maintenance);
    await updateMedia(media);
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

    const counter = [0];
    const finish = available + reference + maintenance;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const checkFinished = () => (counter[0] === finish);

    for (let i = 0; i < available; i++) {
        createInstance(config.statuses.AVAILABLE).then(value => {
            media.addInstance(value);
            counter[0]++;
        });
    }

    for (let i = 0; i < reference; i++) {
        createInstance(config.statuses.REFERENCE).then(value => {
            media.addInstance(value);
            counter[0]++;
        });
    }

    for (let i = 0; i < maintenance; i++) {
        createInstance(config.statuses.MAINTENANCE).then(value => {
            media.addInstance(value);
            counter[0]++;
        });
    }

    while (!checkFinished()) await sleep(50);
    return media;
}

async function remove(id, count = undefined, all = false) {
    let media = await get(id);
    if (media.err) return {err: media.err};

    // FIXME: make better
    if (media) {
        if ((typeof count === 'number') || (count === undefined && all === false)) {
            if (count === undefined) count = 1;
            let c = 0;

            for (let i = 0; i < media.instances.length, c < count; i++) {
                if (media.instances[i].status === config.statuses.AVAILABLE) {
                    await removeInstance(media.instances[i]);
                    delete media.instances[i];
                    i--;
                    c++;
                }
            }

            if (c < count) {
                for (let i = 0; i < media.instances.length, c < count; i++) {
                    if (media.instances[i].status === config.statuses.MAINTENANCE) {
                        await removeInstance(media.instances[i]);
                        delete media.instances[i];
                        i--;
                        c++;
                    }
                }

                if (c < count) {
                    for (let i = 0; i < media.instances.length, c < count; i++) {
                        if (media.instances[i].status === config.statuses.REFERENCE) {
                            await removeInstance(media.instances[i]);
                            delete media.instances[i];
                            i--;
                            c++;
                        }
                    }
                }
            }
        }
        else if (all === true) {
            for (let i = 0; i < media.instances.length; i++) {
                if (media.instances[i].status !== config.statuses.AVAILABLE) {
                    await removeInstance(media.instances[i]);
                    delete media.instances[i];
                    i--;
                }
            }
        }
    }

    if (media.instances.length === 0) {
        await MediaDB.remove({_id: media.innerId});
    } else {
        await updateMedia(media);
    }

    return media;
}

async function createInstance(status) {
    let instance = await MediaInstanceDB.create({
        status: status
    });

    return MediaInstanceClass(instance);
}

async function updateInstance(instance) {
    let instanceModel = MediaInstanceModel(instance);

    await MediaInstanceDB.findByIdAndUpdate(instance.innerId, instanceModel).exec();

    return instance;
}

async function removeInstance(instance) {
    let instanceModel = MediaInstanceModel(instance);

    await MediaInstanceDB.remove({_id: instance.innerId});

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