/*
 * Controller for the media requests.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const responseComposer = require('../../composers/ResponseComposer').media;
const sendJson = require('../../composers/ResponseComposer').sendJson;
const error = require('../../composers/ResponseComposer').error;
const interactor = require('../../../domain/interactors/MediaInteractor');
const usersInteractor = require('../../../domain/interactors/UsersInteractor');

const config = require('../../../util/config');
const defaultNumberOfMedia = config.DEFAULT_MEDIA_NUMBER;
const defaultFields = config.DEFAULT_MEDIA_RESPONSE_FIELDS;

/**
 * Gets the locale from the request
 * @param req
 * @return {string}
 * @private
 */

function getLocale(req) {
    return req.cookies.locale || 'en';
}

/**
 * Module exports
 * @public
 */

module.exports.getAll = async function (req, res) {

    // Traversing request
    const page = req.query.page || 1;
    const length = req.query.length || defaultNumberOfMedia;
    const fields = (typeof req.query.fields === 'string')
        ? req.query.fields.split(',')
        : defaultFields;
    const locale = getLocale(req);

    // Getting the media
    const media = await interactor.getAll(page, length);

    let response = responseComposer.formatMultiple(media, true, fields, page, length, locale, media.err);

    // TODO Get rid of maintenance copies for patron
    // TODO Get rid of 'taker' and 'due_back' for patron

    sendJson(res, response);
};

module.exports.search = async function (req, res) {

};

module.exports.new = async function (req, res) {

    let query = req.body;
    const fields = {
        title: query.title,
        authors: query.authors,
        cost: query.cost,
        keywords: query.keywords,
        bestseller: query.bestseller,
        description: query.description,
        image: query.image,
        published: query.published,
        available: query.available,
        reference: query.reference,
        maintenance: query.maintenance,
    };
    const locale = getLocale(req);

    const media = await interactor.new(fields);

    let response = responseComposer.format(media, true, defaultFields, locale, media.err);
    sendJson(res, response);
};

module.exports.getById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const media = await interactor.getById(id);

    let response = responseComposer.format(media, true, defaultFields, locale, media.err);
    sendJson(res, response);
};

module.exports.updateById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);
    const fields = req.body;

    const media = await interactor.updateById(id, fields);

    let response = responseComposer.format(media, true, defaultFields, locale, media.err);
    sendJson(res, response);
};

module.exports.deleteById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const media = await interactor.deleteById(id);

    let response = responseComposer.format(media.media, true, defaultFields, locale, media.err);
    sendJson(res, response);
};

/**
 * An interface for checking out or reserving a media
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.checkoutById = async function (req, res) {

    // Traversing request
    const mediaId = req.params.id,
        locale = getLocale(req),
        token = req.body.token,
        userId = req.body.user;

    // Checking permissions
    let user = await usersInteractor.verifyToken(token);
    if (user.err) {
        sendJson(res, error(user.err, locale));
        return
    }
    const isLibrarian = user.type === config.userTypes.LIBRARIAN;

    let media;
    if (isLibrarian) {
        user = await usersInteractor.getById(userId);
        if (user.err) {
            sendJson(res, error(user.err, locale));
            return
        }

        // Checking out the media
        media = await interactor.checkoutById(mediaId, user);
    } else {
        // Reserving the media
        media = await interactor.reserveById(mediaId, user);
    }

    if (media.err) {
        sendJson(res, error(media.err, locale));
        return
    }

    let response = responseComposer.format(media, isLibrarian, defaultFields);
    sendJson(res, response);
};

/**
 * Marks the media with given id as returned by user
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.returnById = async function (req, res) {
    const mediaId = req.params.id,
        locale = getLocale(req),
        user = await usersInteractor.verifyToken(req.body.token);

    if (user.err) {
        sendJson(res, error(user.err, locale));
        return
    }

    const media = await interactor.returnById(mediaId, req.body.user || user.id);

    let response = responseComposer.format(media,
        user.type === config.userTypes.LIBRARIAN,
        defaultFields,
        locale,
        media.err);
    sendJson(res, response);
};

/**
 * Gets all instances of the media
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.getAllInstances = async function (req, res) {

};

module.exports.newInstance = async function (req, res) {

};

module.exports.getInstanceById = async function (req, res) {

};

module.exports.updateInstanceById = async function (req, res) {

};

module.exports.deleteInstanceById = async function (req, res) {

};