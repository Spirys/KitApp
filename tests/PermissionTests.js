/*!
 * Module for testing the permissions
 * Copyright (c) 2018 KitApp project
 * Author: Marsel Shaihin
 */

/**
 * Module dependencies
 * @private
 */

const perm = require('../app_server/domain/permissions/Permissions');
const config = require('../app_server/util/config');

/**
 * Defining dummy users
 * @type {string}
 */

const User = function (type) {
    return {type}
};

const patron1 = User(config.userTypes.STUDENT);
const patron2 = User(config.userTypes.FACULTY_INSTRUCTOR);
const patron3 = User(config.userTypes.VISITING_PROFESSOR);

const librarian1 = User(config.userTypes.LIBRARIAN_1);
const librarian2 = User(config.userTypes.LIBRARIAN_2);
const librarian3 = User(config.userTypes.LIBRARIAN_3);
const librarianOld = User(config.userTypes.LIBRARIAN);

const admin = User(config.userTypes.ADMIN);

/**
 * Utility function
 * @private
 */

function error(reason) {
    throw new Error(reason)
}

/**
 * Defining tests
 * Granted permissions are marked with `!`.
 * Bugs in the tested module produce errors.
 * @private
 */

function testPatronRights() {
    if (!perm.hasAccess(patron1, perm.SEE_DOCUMENT)) error('p1');
    if (perm.hasAccess(patron2, perm.MODIFY_DOCUMENT)) error('p2');
    if (!perm.hasAccess(patron3, perm.RENEW_DOCUMENT)) error('p3');
    if (perm.hasAccess(patron3, perm.ADD_LIBRARIAN)) error('p4');
}

function testLibrarianRights() {
    if (!perm.hasAccess(librarian1, perm.SEE_DOCUMENT)) error('l1_see');
    if (!perm.hasAccess(librarian1, perm.SEE_DOCUMENT_EXT)) error('l1_see_ext');
    if (perm.hasAccess(librarian1, perm.ADD_DOCUMENT)) error('l1_add');
    if (perm.hasAccess(librarian1, perm.DELETE_DOCUMENT)) error('l1_del');
    if (perm.hasAccess(librarian1, perm.DELETE_LIBRARIAN)) error('l1_adm');

    if (!perm.hasAccess(librarian2, perm.SEE_DOCUMENT)) error('l2_see');
    if (!perm.hasAccess(librarian2, perm.SEE_DOCUMENT_EXT)) error('l2_see_ext');
    if (!perm.hasAccess(librarian2, perm.ADD_DOCUMENT)) error('l2_add');
    if (perm.hasAccess(librarian2, perm.DELETE_DOCUMENT)) error('l2_del');
    if (perm.hasAccess(librarian2, perm.DELETE_LIBRARIAN)) error('l2_adm');

    if (!perm.hasAccess(librarian3, perm.SEE_DOCUMENT)) error('l3_see');
    if (!perm.hasAccess(librarian3, perm.SEE_DOCUMENT_EXT)) error('l3_see_ext');
    if (!perm.hasAccess(librarian3, perm.ADD_DOCUMENT)) error('l3_add');
    if (!perm.hasAccess(librarian3, perm.DELETE_DOCUMENT)) error('l3_del');
    if (perm.hasAccess(librarian3, perm.DELETE_LIBRARIAN)) error('l3_adm');

    if (!perm.hasAccess(librarianOld, perm.SEE_DOCUMENT)) error('l_old_see');
    if (!perm.hasAccess(librarianOld, perm.SEE_DOCUMENT_EXT)) error('l_old_see_ext');
    if (!perm.hasAccess(librarianOld, perm.ADD_DOCUMENT)) error('l_old_add');
    if (!perm.hasAccess(librarianOld, perm.DELETE_DOCUMENT)) error('l_old_del');
    if (perm.hasAccess(librarianOld, perm.DELETE_LIBRARIAN)) error('l_old_adm');
}

function testAdminRights() {
    if (!perm.hasAccess(admin, perm.ADD_LIBRARIAN)) error('adm_add_lib');
    if (!perm.hasAccess(admin, perm.SEE_LIBRARIAN_INFO)) error('adm_see_lib_info');
    if (!perm.hasAccess(admin, perm.MODIFY_LIBRARIAN_INFO)) error('adm_mod_lib_info');
    if (!perm.hasAccess(admin, perm.MODIFY_LIBRARIAN_RIGHTS)) error('adm_mod_lib_rights');
    if (!perm.hasAccess(admin, perm.DELETE_LIBRARIAN)) error('adm_del_lib');

    if (perm.hasAccess(admin, perm.SEE_DOCUMENT)) error('adm_see');
    if (perm.hasAccess(admin, perm.SEE_DOCUMENT_EXT)) error('adm_see_ext');
    if (perm.hasAccess(admin, perm.ADD_DOCUMENT)) error('adm_add');
    if (perm.hasAccess(admin, perm.DELETE_DOCUMENT)) error('adm_del');

    if (perm.hasAccess(admin, perm.MODIFY_DOCUMENT)) error('adm_mod');
    if (perm.hasAccess(admin, perm.RENEW_DOCUMENT)) error('adm_renew');
}

/**
 * Call tests
 */

testPatronRights();
testLibrarianRights();
testAdminRights();

console.log('All tests passed!');