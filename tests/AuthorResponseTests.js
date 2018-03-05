/*
 * Module for testing the response formatting
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const Author = require('../app_server/domain/models/documents/Author');
const AuthorResponse = require('../app_server/presentation/composers/ResponseComposer').author;
const config = require('../app_server/util/config');

/**
 * Tests
 */

let author1 = new Author('Aldous', 'Huxley', 11023497, "5a7807944e640d058ca83489");
let author2 = new Author('Ray', 'Bradbury', 11023498, "5a7807944e640d058ca8348a");
let author3 = new Author('Bob', 'Smith', 7948375, "5a74b1e9293d300034794857");
author3.birthDate = '01-01-2018';

let authors1 = [author1, author2, author3];
let authors2 = [author2];
let authors3 = [];

let test1_1 = AuthorResponse.format(author1, config.DEFAULT_AUTHOR_RESPONSE_FIELDS);
let test1_2 = AuthorResponse.format(author1, ['id', 'name']);
let test1_3 = AuthorResponse.format(author1, ['id', 'extra']);
let test1_4 = AuthorResponse.format(author3, ['id', 'birth_date']);

let test2_1 = AuthorResponse.formatMultiple(authors1);
let test2_2 = AuthorResponse.formatMultiple(authors2);
let test2_3 = AuthorResponse.formatMultiple(authors3);

let test3_1 = AuthorResponse.formatMultiple(authors1, ['id', 'name']);
let test3_2 = AuthorResponse.formatMultiple(authors1, ['id', 'extra']);
let test3_3 = AuthorResponse.formatMultiple(authors1, []);

console.log(test2_1);