const messages = require("./messages");

/*
    Codes
 */
module.exports.errorCode = messages.errorCode;
module.exports.okCode = messages.okCode;

/*
    Messages
 */
module.exports.userNotRegistered = messages.userNotRegistered;
module.exports.noLoginProvided = messages.noLoginProvided;
module.exports.noPassProvided = messages.noPassProvided;
module.exports.wrongPassword = messages.wrongPassword;

/*
    Security configuration
 */
module.exports.cookieHttpsOnly = false;