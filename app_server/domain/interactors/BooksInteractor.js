/*
 * Books Interactor
 * An intermediary that checks all the inputs
 * and either returns an error or performs the required action
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const validator = require('../validation/InputValidation');
const Repository = require('../../data/RepositoryProvider').BooksRepository;

/**
 * Module exports
 * @public
 */

/**
 * Gets all books from the repository starting from (page - 1) * length till the length - 1
 * @param page
 * @param length
 * @param fields
 * @return {Promise<Array>}
 */

module.exports.getAll = async function (page, length, fields) {
    return await Repository.getAll(page, length, fields);
};

module.exports.search = async function () {
    
};

module.exports.new = async function () {

};

module.exports.getById = async function () {

};

module.exports.updateById = async function () {

};

module.exports.deleteById = async function () {

};

module.exports.checkoutById = async function () {

};

/**
 * Marks the book with given id as returned by user
 */

module.exports.returnById = async function (id, user) {

};

/**
 * Gets all instances of the book
 * @return {Promise<void>}
 */

module.exports.getAllInstances = async function (book) {

};

module.exports.newInstance = async function (book, instance) {

};

module.exports.getInstanceById = async function () {

};

module.exports.updateInstanceById = async function () {

};

module.exports.deleteInstanceById = async function () {

};