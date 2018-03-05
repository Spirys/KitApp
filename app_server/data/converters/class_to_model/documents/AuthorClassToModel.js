'use strict';

module.exports = author => {
    let aut = {
        _id: author.innerId,
        first_name: author.firstName,
        last_name: author.lastName
    };

    if (author.birthDate) aut.birth_date = author.birthDate;
    if (author.deathDate) aut.death_date = author.deathDate;

    return aut;
};