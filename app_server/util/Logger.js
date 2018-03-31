/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const winston = require('winston');
const moment = require('moment');

/**
 * Configuration
 * @private
 */

const configuration = {
    timestamp: () => moment().format(`DD/MM/YYYY HH:mm:ss`),
    formatter: (options) =>
        '[' + options.timestamp() + '] '
            + winston.config.colorize(options.level, options.level.toUpperCase()) + ' '
            + (options.message || '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
};

const logger = new winston.Logger({
    transports: [
        new (winston.transports.File)({
            name: 'error',
            filename: 'logs/error.log',
            timestamp: configuration.timestamp,
            formatter: configuration.formatter,
            level: 'error'
        }),
        new (winston.transports.File)({
            name: 'debug',
            filename: 'logs/debug.log',
            timestamp: configuration.timestamp,
            formatter: configuration.formatter,
            level: 'debug'
        }),
        new (winston.transports.File)({
            name: 'info',
            filename: 'logs/info.log',
            timestamp: configuration.timestamp,
            formatter: configuration.formatter,
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'all',
            filename: 'logs/combined.log',
            timestamp: configuration.timestamp,
            formatter: configuration.formatter,
        }),
        new (winston.transports.Console)(configuration)
    ]
});

/**
 * Module exports
 * @public
 */

module.exports = logger;