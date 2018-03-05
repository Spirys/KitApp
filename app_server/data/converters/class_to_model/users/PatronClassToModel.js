'use strict';

module.exports = patron => {
    let user = {
        _id: patron.innerId,
        first_name: patron.firstName,
        last_name: patron.lastName,
        type: patron.type,
        birth_date: patron.birthDate,
        phone: patron.phone
    };

    if (patron.email) user.email = patron.email;
    if (patron.occupation) user.occupation = patron.occupation;
    if (patron.about) user.about = patron.about;
    if (patron.telegram) user.telegram = patron.telegram;
    if (patron.avatar) user.avatar = patron.avatar;

    return user;
};