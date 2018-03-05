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

module.exports[errors.INTERNAL] = 'Произошла внутренняя ошибка сервера';
module.exports[errors.ERROR2] = 'Произошла ошибка 2';
module.exports[errors.ERROR3] = 'Произошла ошибка 3';
module.exports[errors.WRONG_LOGIN_PASSWORD] = 'Неверная пара логин/пароль';
module.exports[errors.INVALID_TOKEN] = 'Неверный токен';
module.exports[errors.DOCUMENT_NOT_FOUND] = 'Запрашиваемый документ не найден';
module.exports[errors.DOCUMENT_ALREADY_TAKEN] = 'Запрашиваемый документ уже есть у пользователя';
module.exports[errors.DOCUMENT_NOT_AVAILABLE] = 'Запрашиваемый документ нельзя взять';
module.exports[errors.DOCUMENT_NOT_TAKEN] = 'Запрашиваемый документ не взят данным пользователем';