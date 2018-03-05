'use strict';

const Patron = require('../../../../domain/models/users/Patron');

module.exports = patron => {
    if (!patron) {
        return null;
    }

    let user = new Patron(patron.first_name, patron.last_name, patron.id, patron._id,
        patron.type, patron.birth_date, patron.phone);

    if (patron.email) user.email = patron.email;
    if (patron.occupation) user.occupation = patron.occupation;
    if (patron.about) user.about = patron.about;
    if (patron.telegram) user.telegram = patron.telegram;
    if (patron.avatar) user.avatar = patron.avatar;

    return user;
};