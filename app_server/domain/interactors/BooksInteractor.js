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

const Repository = require('../../data/RepositoryProvider').BooksRepository;
const DocumentInstance = require('../models/documents/DocumentInstance.js');

/**
 * Module exports
 * @public
 */

/**
 * Gets all books from the repository starting from (page - 1) * length till the length - 1
 * @param page
 * @param length
 * @param fields the fields to include
 * @return {Promise<Array>}
 */

module.exports.getAll = async function (page, length, fields) {
    return await Repository.getAll(page, length, fields);
};

module.exports.search = async function () {
    
};

module.exports.new = async function (fields) {
    return await Repository.create(fields);
};

module.exports.getById = async function (id) {
    return await Repository.get(id);
};

module.exports.updateById = async function (id, fields) {
    let book = await Repository.get(id);
    book.title = 'NEW';
    return await Repository.update(book);
};

module.exports.deleteById = async function () {
    return await Repository.delete(id);
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

module.exports.newInstance = async function (id, request) {
    const inst = new DocumentInstance(request.status);
    inst.dueBack = request.due_back;
    inst.taker = request.taker;

    let book = await Repository.get(id);
    book.addInstance(inst);
    return await Repository.update(book, 'instances');
};

module.exports.getInstanceById = async function () {

};

module.exports.updateInstanceById = async function () {

};

module.exports.deleteInstanceById = async function () {

};