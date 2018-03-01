/*!
 * Repository provider
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Cache for the repositories
 * @private
 */

const repositories = Object.create(null);

/**
 * Provides a repository with given name
 * @param repoName
 * @private
 */

function provideRepository(repoName) {
    let repository = repositories[repoName];

    // Use cached version if present
    if (repository) {
        return repository
    }

    // Require if not present
    switch (repoName) {
        case 'authentication':
            repository = require('./repositories/AuthenticationRepository');
            break;
        case 'authors':
            repository = require('./repositories/AuthorsRepository');
            break;
        case 'books':
            repository = require('./repositories/BooksRepository');
            break;
        case 'journals':
            repository = require('./repositories/JournalsRepository');
            break;
        case 'media':
            repository = require('./repositories/MediaRepository');
            break;
        case 'userFiles':
            repository = require('./repositories/UserFilesRepository');
            break;
        case 'users':
            repository = require('./repositories/UsersRepository');
            break;
    }

    return (repositories[repoName] = repository)
}

/**
 * Module exports
 * @public
 */

module.exports.AuthenticationRepository  = provideRepository('authentication');
module.exports.AuthorsRepository         = provideRepository('authors');
module.exports.BooksRepository           = provideRepository('books');
module.exports.JournalsRepository        = provideRepository('journals');
module.exports.MediaRepository           = provideRepository('media');
module.exports.UserFilesRepository       = provideRepository('userFiles');
module.exports.UsersRepository           = provideRepository('users');