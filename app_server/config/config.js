const messages = require("./messages");

/*
    Codes
 */
module.exports.errorCode = "error";

// Not safe to change this variable. Must also change public/javascripts/login.js
module.exports.okCode = "ok";

/*
    Error messages
 */
module.exports.userNotRegistered    = messages.userNotRegistered;
module.exports.noLoginProvided      = messages.noLoginProvided;
module.exports.noPassProvided       = messages.noPassProvided;
module.exports.wrongPassword        = messages.wrongPassword;
module.exports.invalidSession       = messages.invalidSession;

/*
    UI messages (possible localization)
 */
module.exports.signIn = messages.signIn;

/*
    Document statuses (possible localization)
 */
module.exports.statusAvailable      = 'Available';
module.exports.statusMaintenance    = 'Maintenance';
module.exports.statusLoaned         = 'Loaned';
module.exports.statusReserved       = 'Reserved';

/*
    Patron types
 */
module.exports.patronTypes          = ['Student', 'Faculty member'];

/*
    Security configuration
 */
module.exports.cookieHttpsOnly = false;
module.exports.sessionExpires = 1000 * 60 * 60 * 24 * 7; // 1 week

/*
    Database configuration
 */
module.exports.mongoURI = "mongodb://innoproject:YASFbay5kpjQ@ds046677.mlab.com:46677/kitapp";