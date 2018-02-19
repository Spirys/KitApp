const messages = require('./messages');
const DAY   = 1000 * 60 * 60 * 24;
const WEEK  = DAY * 7;

/*
    Codes
 */
module.exports.errorCode = 'error';
module.exports.permissionDeniedCode = 'forbidden';

// Not safe to change this variable. Must also change public/javascripts/login.js
module.exports.okCode = 'ok';

/*
    UI messages (possible localization)
 */
module.exports.signIn               = messages.signIn;

/*
    Images
 */
module.exports.noImage              = '/images/no_image.png';
module.exports.defaultUserImage     = '/images/user.png';

/*
    Document statuses (possible localization)
 */
module.exports.statusAvailable      = 'Available';
module.exports.statusMaintenance    = 'Maintenance';
module.exports.statusLoaned         = 'Loaned';
module.exports.statusReserved       = 'Reserved';

/*
    Types
 */
module.exports.patronTypes          = ['Student', 'Faculty member'];
module.exports.documentTypes        = ['book', 'journal', 'media'];

/*
    Request defaults
 */
module.exports.defaultPageLength = 25;
module.exports.requiredDocumentFields = {
    book        : ['title', 'authors', 'cost', 'edition', 'publisher', 'keywords'],
    journal     : ['title', 'publisher', 'editors', 'date'],
    media       : ['name']
};

/*
    Check out settings
 */
module.exports.loanTime = function (type) {
    return type === exports.patronTypes[0]
            ? 2 * WEEK
            : 4 * WEEK;
};

/*
    Error messages
 */
module.exports.bookCreationFailed       = messages.bookCreationFailed;
module.exports.journalCreationFailed    = messages.journalCreationFailed;
module.exports.userNotRegistered        = messages.userNotRegistered;
module.exports.noLoginProvided          = messages.noLoginProvided;
module.exports.noPassProvided           = messages.noPassProvided;
module.exports.wrongPassword            = messages.wrongPassword;
module.exports.invalidSession           = messages.invalidSession;
module.exports.invalidToken             = messages.invalidToken;
module.exports.emptyDocument            = messages.emptyDocument;
module.exports.missingRequired          = messages.missingRequired;
module.exports.unknownDocument          = messages.unknownDocument
    + '. Please make sure that you specify one of the following: '
    + module.exports.documentTypes;
module.exports.bookDoesNotExist         = messages.bookDoesNotExist;
module.exports.invalidId                = messages.invalidId;
module.exports.bookUnavailable          = messages.bookUnavailable;
module.exports.documentAlreadyTaken     = messages.documentAlreadyTaken;

/*
    Security configuration
 */
module.exports.cookieHttpsOnly  = false;
module.exports.sessionExpires   = 1000 * 60 * 60 * 24 * 7; // 1 week

/*
    Database configuration
 */
module.exports.mongoURI         = 'mongodb://dev:12346@ds012058.mlab.com:12058/kitapp-tests';