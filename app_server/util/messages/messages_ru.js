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
module.exports[msg.errors.NO_ACCESS] = 'Доступ закрыт';
module.exports[msg.errors.ERROR3] = 'Произошла ошибка 3';
module.exports[msg.errors.WRONG_LOGIN_PASSWORD] = 'Неверная пара логин/пароль';
module.exports[msg.errors.INVALID_TOKEN] = 'Неверный токен';
module.exports[msg.errors.INVALID_ID] = 'Неверный идентификатор';
module.exports[msg.errors.DOCUMENT_NOT_FOUND] = 'Документ не найден';
module.exports[msg.errors.DOCUMENT_ALREADY_TAKEN] = 'Документ уже есть у пользователя';
module.exports[msg.errors.DOCUMENT_ALREADY_RENEWED] = 'Документ уже был продлён пользователем';
module.exports[msg.errors.DOCUMENT_RENEWAL_UNAVAILABLE] = 'Запрашиваемый документ нельзя продлить';
module.exports[msg.errors.DOCUMENT_NOT_AVAILABLE] = 'Запрашиваемый документ нельзя взять';
module.exports[msg.errors.DOCUMENT_NOT_TAKEN] = 'Документ не взят данным пользователем';
module.exports[msg.errors.USER_NOT_FOUND] = 'Пользователь не найден';

module.exports[msg.errors.REQUIRED_FIELDS_MISSING] = 'Обязательные поля не указаны';
module.exports[msg.errors.WRONG_INPUT] = 'Неверный формат данных';

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

// Actions
module.exports[msg.actions.RESERVE_DOCUMENT] = 'Взять';
module.exports[msg.actions.DOCUMENT_TAKEN] = 'Взят';
module.exports[msg.actions.CHECKOUT_DOCUMENT] = 'Выдать';
module.exports[msg.actions.RENEW_DOCUMENT] = 'Продлить';
module.exports[msg.actions.RETURN_DOCUMENT] = 'Вернуть';
module.exports[msg.actions.NO_ACTION] = 'NO_ACTION';