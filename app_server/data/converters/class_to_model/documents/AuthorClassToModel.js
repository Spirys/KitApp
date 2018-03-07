'use strict';

module.exports = author => {
    let aut = {
        _id: author.innerId,
        first_name: author.firstName,
        last_name: author.lastName
    };

    aut.birth_date = (author.birthDate) ? author.birth_date : undefined;
    aut.death_date = (author.deathDate) ? author.death_date : undefined;

    return aut;
};