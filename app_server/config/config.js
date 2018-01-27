const messages = require("./messages");

/*
    Codes
 */
module.exports.errorCode = messages.errorCode;
module.exports.okCode = messages.okCode;

/*
    Error messages
 */
module.exports.userNotRegistered = messages.userNotRegistered;
module.exports.noLoginProvided = messages.noLoginProvided;
module.exports.noPassProvided = messages.noPassProvided;
module.exports.wrongPassword = messages.wrongPassword;
module.exports.invalidSession = messages.invalidSession;

/*
    UI messages (possible localization)
 */
module.exports.signIn = messages.signIn;

/*
    Security configuration
 */
module.exports.cookieHttpsOnly = false;
module.exports.sessionExpires = 1000 * 60 * 60 * 24 * 7; // 1 week