/*!
 * Copyright (c) 2018 KitApp project
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const moment = require('moment');
const constants = require('./constants');

const MESSAGES_RU = require('./messages/messages_ru');
const MESSAGES_TT = require('./messages/messages_tt');
const MESSAGES_EN = require('./messages/messages_en');
const MESSAGES_DE = require('./messages/messages_de');
const MESSAGES_ES = require('./messages/messages_es');
const MESSAGES_FR = require('./messages/messages_fr');
const MESSAGES_IT = require('./messages/messages_it');
const MESSAGES_JA = require('./messages/messages_ja');
const MESSAGES_KO = require('./messages/messages_ko');
const MESSAGES_PT = require('./messages/messages_pt');
const MESSAGES_ZH = require('./messages/messages_zh');

let userTypes;

/**
 * Module exports
 * @public
 */

/**
 * Provides messages by locales. By default all messages are in 'EN' locale
 * @param locale {string} Code of the locale in ISO 639-1 format
 * @return {MESSAGES}
 */

module.exports.messages = function (locale) {
    if (locale && typeof locale === 'string') {
        switch(locale.toLowerCase()) {
            case 'ru': return MESSAGES_RU;
            case 'tt': return MESSAGES_TT;
            case 'de': return MESSAGES_DE;
            case 'es': return MESSAGES_ES;
            case 'fr': return MESSAGES_FR;
            case 'it': return MESSAGES_IT;
            case 'ja': return MESSAGES_JA;
            case 'ko': return MESSAGES_KO;
            case 'pt': return MESSAGES_PT;
            case 'zh': return MESSAGES_ZH;
            default: return MESSAGES_EN;
        }
    } else return MESSAGES_EN;
};

/**
 * Gets the locale from the request
 * @return {string}
 * @public
 */

module.exports.getLocale = (req) => req.cookies.locale;

/**
 * Returns fine for a document
 * @param instance {DocumentInstance}
 * @return {number}
 */

module.exports.fine = (instance) => {
    let currentDate = moment(),
        dueBack = moment(instance.due_back, constants.DATE_FORMAT_EXT);
    if (dueBack.isBefore(currentDate)) {
        let fine = (currentDate.diff(dueBack, 'days', true) | 0) * constants.FINE_FOR_DELAY,
            document = instance.book || instance.journal || instance.media;
        if (fine > document.cost) fine = document.cost;
        return fine
    }
    return 0
};

module.exports.userTypeToNumber = (user) => {
    switch(user.type) {
        case userTypes.STUDENT:
            return 5;
        case userTypes.FACULTY_INSTRUCTOR:
            return 4;
        case userTypes.FACULTY_TA:
            return 3;
        case userTypes.VISITING_PROFESSOR:
            return 2;
        case userTypes.FACULTY_PROFESSOR:
            return 1;
        case userTypes.LIBRARIAN_1:
        case userTypes.LIBRARIAN_2:
        case userTypes.LIBRARIAN_3:
            return 0;
    }
};

module.exports.setUserTypes = (types) => userTypes = types;