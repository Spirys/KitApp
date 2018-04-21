/*!
 * Business logic defining the permissions of the users
 * Copyright (c) 2018 KitApp project
 * Author: Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');

/**
 * Module functionality
 * @private
 */

/**
 * Helper class to enumerate possible actions
 * @private
 */

class Action {
    constructor(message) {
        this._message = message
    }

    get message() {
        return this._message
    }
}

// TODO auto-generate documentation
// TODO Place descriptive messages to calls

const perm = {
    ADD_DOCUMENT: new Action(), // Create a new document
    SEE_DOCUMENT: new Action(), // Get the document info
    SEE_DOCUMENT_EXT: new Action(), // Get more info about document (instances)
    MODIFY_DOCUMENT: new Action(),
    DELETE_DOCUMENT: new Action(),

    RESERVE_DOCUMENT: new Action(),
    CHECKOUT_DOCUMENT: new Action(),
    QUEUE_DOCUMENT: new Action(),
    RENEW_DOCUMENT: new Action(),
    RETURN_DOCUMENT: new Action(),

    PLACE_OUTSTANDING: new Action(), // Place an outstanding request
    CANCEL_OUTSTANDING: new Action(), // Cancel the outstanding request

    ADD_USER: new Action(),
    SEE_USER_INFO: new Action(),
    MODIFY_USER_INFO: new Action(),
    DELETE_USER: new Action(),

    MODIFY_USER_RIGHTS: new Action(),

    ADD_LIBRARIAN: new Action(),
    SEE_LIBRARIAN_INFO: new Action(),
    MODIFY_LIBRARIAN_INFO: new Action(),
    MODIFY_LIBRARIAN_RIGHTS: new Action(),
    DELETE_LIBRARIAN: new Action()
};

/**
 * Defining the rights of the patron
 * @private
 */

const PatronRights = [
    perm.SEE_DOCUMENT,
    perm.RESERVE_DOCUMENT,
    perm.QUEUE_DOCUMENT,
    perm.RENEW_DOCUMENT
];

/**
 * Defining the rights of the librarian with `Priv1` privileges
 * @private
 */

const LIBRARIAN_1_RIGHTS = [
    perm.SEE_DOCUMENT,
    perm.SEE_DOCUMENT_EXT,
    perm.MODIFY_DOCUMENT,

    perm.SEE_USER_INFO,
    perm.MODIFY_USER_INFO,
    perm.MODIFY_USER_RIGHTS
];

/**
 * Defining the rights of the librarian with `Priv2` privileges
 * @private
 */

const LIBRARIAN_2_RIGHTS = [
    ...LIBRARIAN_1_RIGHTS,
    perm.ADD_DOCUMENT,
    perm.ADD_USER,
    perm.PLACE_OUTSTANDING,
    perm.CANCEL_OUTSTANDING
];

/**
 * Defining the rights of the librarian with `Priv3` privileges
 * @private
 */

const LIBRARIAN_3_RIGHTS = [
    ...LIBRARIAN_2_RIGHTS,
    perm.DELETE_DOCUMENT,
    perm.DELETE_USER
];

/**
 * Defining the administrator rights
 * @private
 */

const ADMIN_RIGHTS = [
    perm.ADD_LIBRARIAN,
    perm.SEE_LIBRARIAN_INFO,
    perm.MODIFY_LIBRARIAN_INFO,
    perm.MODIFY_LIBRARIAN_RIGHTS,
    perm.DELETE_LIBRARIAN
];

/**
 * Checks whether all the actions are available
 * @param actions {Array<Action>} Actions to be performed
 * @param rights {Array<Action>} All the rights of the user
 * @param exclude {Action=} Action to be excluded from check
 */

function check(actions, rights, exclude) {
    if (actions) {
        for (let action of actions) {
            if (action === exclude) continue;
            if (!rights.includes(action)) return false;
        }
        return true
    } else return true;
}

/**
 * Module exports
 * @public
 */

module.exports = perm;

/**
 * Checks whether the user can perform actions
 * @param user {User}
 * @param actions {Action|Array<Action>}
 */

module.exports.hasAccess = function (user, ...actions) {
    switch (user.type) {
        case config.userTypes.STUDENT:
        case config.userTypes.FACULTY_TA:
        case config.userTypes.FACULTY_PROFESSOR:
        case config.userTypes.FACULTY_INSTRUCTOR:
            return check(actions, PatronRights);

        case config.userTypes.VISITING_PROFESSOR:
            return check(actions, PatronRights, perm.RENEW_DOCUMENT);

        case config.userTypes.LIBRARIAN_1:
            return check(actions, LIBRARIAN_1_RIGHTS);

        case config.userTypes.LIBRARIAN_2:
            return check(actions, LIBRARIAN_2_RIGHTS);

        case config.userTypes.LIBRARIAN:
        case config.userTypes.LIBRARIAN_3:
            return check(actions, LIBRARIAN_3_RIGHTS);

        case config.userTypes.ADMIN:
            return check(actions, ADMIN_RIGHTS);

        default: return false
    }
};