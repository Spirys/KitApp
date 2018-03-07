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

module.exports[errors.INTERNAL] = 'Errore interno';
module.exports[errors.ERROR2] = 'Errore 2 si è verificato';
module.exports[errors.ERROR3] = 'Errore 3 si è verificato';
module.exports[errors.WRONG_LOGIN_PASSWORD] = 'Accesso errato/password';
module.exports[errors.INVALID_TOKEN] = 'Token non valido';
module.exports[errors.DOCUMENT_NOT_FOUND] = 'Documento richiesto non trovato';
module.exports[errors.DOCUMENT_ALREADY_TAKEN] = 'Il documento richiesto è già preso dall\'utente';
module.exports[errors.DOCUMENT_NOT_AVAILABLE] = 'Documento richiesto non disponibile';
module.exports[errors.DOCUMENT_NOT_TAKEN] = 'Il documento richiesto non è preso da l\'utente ';
module.exports[errors.USER_NOT_FOUND] = 'Utente non trovato';