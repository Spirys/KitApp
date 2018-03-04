/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const errors = require('./messages').errors;

/**
 * Module exports. Designed to strictly match error definitions in config file
 * @public
 */

module.exports[errors.ERROR1] = 'Произошла ошибка 1';
module.exports[errors.ERROR2] = 'Произошла ошибка 2';
module.exports[errors.ERROR3] = 'Произошла ошибка 3';
module.exports[errors.WRONG_LOGIN_PASSWORD] = 'Неверная пара логин/пароль';