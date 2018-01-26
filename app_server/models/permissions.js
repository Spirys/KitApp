
exports = {
    // Permissions with documents
    PERM_DOCUMENT_SEARCH:           0x00011,
    PERM_DOCUMENT_GET:              0x00012,
    PERM_DOCUMENT_ADD:              0x00013,
    PERM_DOCUMENT_MODIFY:           0x00014,
    PERM_DOCUMENT_DELETE:           0x00015,
    PERM_DOCUMENT_BOOK:             0x00016,
    PERM_DOCUMENT_RETURN:           0x00017,
    PERM_DOCUMENT_PAY_FINE:         0x00018,
    PERM_DOCUMENT_LOOKUP_OUTDATED:  0x00019,

    // Permissions with users
    PERM_USER_SEARCH:               0x00021,
    PERM_USER_GET:                  0x00021,
    PERM_USER_ADD:                  0x00022,
    PERM_USER_MODIFY:               0x00023,
    PERM_USER_BAN:                  0x00024,
    PERM_USER_DELETE:               0x00025,
    PERM_USER_SELF_MODIFY:          0x00025
};

/**
 * Defines a set of permissions available for a non-authorized user
 * @type {*[]} an array of permissions
 */
const noAuth = [exports.PERM_DOCUMENT_SEARCH, exports.PERM_DOCUMENT_GET];

const patron = noAuth.concat(
    [exports.PERM_DOCUMENT_BOOK,
        exports.PERM_DOCUMENT_RETURN,
        exports.PERM_DOCUMENT_PAY_FINE,
        exports.PERM_USER_SELF_MODIFY]);

const librarian = noAuth.concat(
    [exports.PERM_DOCUMENT_ADD,
        exports.PERM_DOCUMENT_MODIFY,
        exports.PERM_DOCUMENT_DELETE,

        exports.PERM_DOCUMENT_PAY_FINE,
        exports.PERM_USER_SELF_MODIFY]);

const admin = [];

module.exports.noAuth = noAuth;
module.exports.patron = patron;
module.exports.librarian = librarian;
module.exports.admin = admin;