/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const msg = require('./messages');

/**
 * Module exports. Designed to strictly match error definitions in config file
 * @public
 */

module.exports[msg.errors.INTERNAL] = 'Произошла внутренняя ошибка сервера';
module.exports[msg.errors.ERROR2] = 'Произошла ошибка 2';
module.exports[msg.errors.ERROR3] = 'Произошла ошибка 3';
module.exports[msg.errors.WRONG_LOGIN_PASSWORD] = 'Неверная пара логин/пароль';
module.exports[msg.errors.INVALID_TOKEN] = 'Неверный токен';
module.exports[msg.errors.INVALID_ID] = 'Неверный идентификатор';
module.exports[msg.errors.DOCUMENT_NOT_FOUND] = 'Документ не найден';
module.exports[msg.errors.DOCUMENT_ALREADY_TAKEN] = 'Документ уже есть у пользователя';
module.exports[msg.errors.DOCUMENT_ALREADY_RENEWED] = 'Документ уже был продлён пользователем';
module.exports[msg.errors.DOCUMENT_NOT_AVAILABLE] = 'Запрашиваемый документ нельзя взять';
module.exports[msg.errors.DOCUMENT_NOT_TAKEN] = 'Документ не взят данным пользователем';
module.exports[msg.errors.USER_NOT_FOUND] = 'Пользователь не найден';

// General messages
module.exports[msg.general.PASSWORD] = 'Пароль';
module.exports[msg.general.LMS_DESCRIPTION_SHORT] = 'Библиотечная система Университета Иннополис';

// Login page labels
module.exports[msg.login.LOGIN] = 'Вход';
module.exports[msg.login.REMEMBER_ME] = 'Запомнить меня';
module.exports[msg.login.SIGN_IN] = 'Войти';
module.exports[msg.login.REGISTER] = 'Регистрация';
module.exports[msg.login.FORGOT_PASSWORD] = 'Забыли пароль?';
module.exports[msg.login.ISSUES] = 'Не можете войти?';

// User interface labels
module.exports[msg.user.DASHBOARD] = 'Главная';
module.exports[msg.user.CATALOG] = 'Каталог';
module.exports[msg.user.USER_CARD] = 'Профиль';
module.exports[msg.user.DATABASE] = 'База данных';
module.exports[msg.user.READERS] = 'Читатели';
module.exports[msg.user.LOGOUT] = 'Выход';