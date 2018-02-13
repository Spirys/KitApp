/*!
 * Repository provider
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module exports
 * @public
 */

module.exports.provideAuthenticationRepository  = provideRepository('authentication');
module.exports.provideAuthorsRepository         = provideRepository('authors');
module.exports.provideBooksRepository           = provideRepository('books');
module.exports.provideJournalsRepository        = provideRepository('journals');
module.exports.provideMediaRepository           = provideRepository('media');
module.exports.provideUserFilesRepository       = provideRepository('userFiles');
module.exports.provideUsersRepository           = provideRepository('users');

/**
 * Module dependencies
 * @private
 */

/**
 * Cache for the repositories
 * @private
 */

const repositories = Object.create(null);

/**
 * Provides a repository with given name
 * @param repoName
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