'use strict';

const Author = require('../../../../domain/models/documents/Author');

module.exports = author => {
    if (!author) {
        return null;
    }

    let aut = new Author(author.first_name, author.last_name, author.id, author._id);

    if (author.birth_date) aut.birthDate = author.birth_date;
    if (author.death_date) aut.deathDate = author.death_date;

    return aut;
};