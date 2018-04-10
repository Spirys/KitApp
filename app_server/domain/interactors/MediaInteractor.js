/*
 * Media Interactor
 * An intermediary that checks all the inputs
 * and either returns an error or performs the required action
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const Repository = require('../../data/RepositoryProvider').MediaRepository;
const config = require("../../util/config");

/**
 * Module functions
 * @private
 */

/**
 * Finds the available copy of the media and also checks whether a user has a copy
 * @param media {Media}
 * @param [user]
 * @return {*}
 */

function findAvailable(media, user) {
    if (!user || !user.id) user = {id: -1}; // Do not consider user if not sent

    let indexAvailable = -1;

    for (let i = 0; i < media.instances.length; i++) {
        let instance = media.instances[i];

        // Searching for available copies
        if (indexAvailable === -1 && instance.status === config.statuses.AVAILABLE) {
            indexAvailable = i;
        }

        if (instance.taker && instance.taker.id === user.id) return {err: config.errors.DOCUMENT_ALREADY_TAKEN}
    }

    if (indexAvailable === -1) return {err: config.errors.DOCUMENT_NOT_AVAILABLE};
    return indexAvailable;
}

/**
 * Module exports
 * @public
 */

/**
 * Gets all media from the repository starting from (page - 1) * length till the length - 1
 * @param page
 * @param length
 * @return {Promise<Array<Media>>}
 */

module.exports.getAll = async function (page, length) {
    return await Repository.getAll(page, length);
};

// TODO
module.exports.search = async function () {

};

module.exports.new = async function (fields) {
    return await Repository.create(fields);
};

module.exports.getById = async function (id) {
    return await Repository.get(id);
};

module.exports.updateById = async function (id, fields) {
    let media = await Repository.get(id);

    // TODO: add authors
    if (fields.title) media.title = fields.title;
    if (fields.cost) media.cost = fields.cost;
    if (typeof fields.bestseller === 'boolean') media.bestseller = fields.bestseller;
    if (fields.keywords) media.keywords = fields.keywords;
    if (fields.description) media.description = fields.description;
    if (fields.image) media.image = fields.image;
    if (fields.published) media.published = fields.published;

    return media;
};

module.exports.deleteById = async function (id) {
    return await Repository.delete(id);
};

module.exports.reserveById = async function (mediaId, user) {
    let media = await Repository.get(mediaId);
    if (media.err) return {err: media.err};

    // Finding an available copy
    let indexAvailable = findAvailable(media, user);
    if (indexAvailable.err) return {err: indexAvailable.err};

    /*
        Marking the instance as reserved
    */

    let currentTime = Date.now(),
        instance = media.instances[indexAvailable];

    instance.status = config.statuses.RESERVED;
    instance.taker = user;
    instance.take_due = new Date(currentTime + config.DOCUMENT_RESERVATION_TIME);

    // Applying business logic
    let timeDue = currentTime;
    timeDue += (user.type === config.userTypes.STUDENT)
        ? (media.bestseller)
            ? config.CHECKOUT_TIME_STUDENT_BESTSELLER
            : config.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER
        : config.CHECKOUT_TIME_FACULTY;

    instance.due_back = new Date(timeDue);

    return media;
};

module.exports.checkoutById = async function (mediaId, user) {

    // Getting the media
    let media = await Repository.get(mediaId);
    if (media.err) return {err: media.err};

    // Finding an available copy
    let indexAvailable = findAvailable(media, user);
    if (indexAvailable.err) return {err: indexAvailable.err};

    /*
        Marking the instance as loaned
    */

    let currentTime = Date.now(),
        instance = media.instances[indexAvailable];

    instance.status = config.statuses.LOANED;
    instance.taker = user;

    // Applying business logic
    let timeDue = currentTime;
    timeDue += (user.type === config.userTypes.STUDENT)
        ? (media.bestseller)
            ? config.CHECKOUT_TIME_STUDENT_BESTSELLER
            : config.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER
        : config.CHECKOUT_TIME_FACULTY;

    instance.due_back = new Date(timeDue);

    return media;
};

/**
 * Marks the media with given id as returned by user
 */

module.exports.returnById = async function (mediaId, userId) {

    // Getting the media
    let media = await Repository.get(mediaId);
    if (media.err) return {err: config.errors.DOCUMENT_NOT_FOUND};

    // Finding the loaned media which is taken by the user
    let instance = media.instances.find(i => i.taker && i.taker.id === userId);

    if (!instance) return {err: config.errors.DOCUMENT_NOT_TAKEN};

    instance.status = 'Available';
    instance.taker = undefined;
    instance.due_back = undefined;
    instance.take_due = undefined;

    return media;
};

/**
 * Gets all instances of the media
 * @return {Promise<void>}
 */

module.exports.getAllInstances = async function (media) {

};

module.exports.newInstance = async function (id, request) {
    // const inst = new DocumentInstance(request.status);
    // inst.due_back = request.due_back;
    // inst.taker = request.taker;
    //
    // let media = await Repository.get(id);
    // if (media.err) return {err: media.err};
    //
    // media.addInstance(inst);
    // return media;
};

module.exports.getInstanceById = async function () {

};

module.exports.updateInstanceById = async function () {

};

module.exports.deleteInstanceById = async function () {

};