/*
 * Controller for the book requests.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const responseComposer = require('../../composers/ResponseComposer').book;
const interactor = require('../../../domain/interactors/BooksInteractor');
const usersInteractor = require('../../../domain/interactors/UsersInteractor');

/**
 * Module exports
 * @public
 */

module.exports.getAll = async function (req, res) {
    const books = interactor.getAll();
    let response = {};

    res.json(response);
};

module.exports.search = async function (req, res) {

};

module.exports.new = async function (req, res) {

};

module.exports.getById = async function (req, res) {

};

module.exports.updateById = async function (req, res) {

};

module.exports.deleteById = async function (req, res) {

};

module.exports.checkoutById = async function (req, res) {

};

/**
 * Marks the book with given id as returned by user
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.returnById = async function (req, res) {

};

/**
 * Gets all instances of the book
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.getAllInstances = async function (req, res) {

};

module.exports.newInstance = async function (req, res) {

};

module.exports.getInstanceById = async function (req, res) {

};

module.exports.updateInstanceById = async function (req, res) {

};

module.exports.deleteInstanceById = async function (req, res) {

};