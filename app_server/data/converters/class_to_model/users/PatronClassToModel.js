'use strict';

const Book = require('../documents/BookClassToModel');
const Journal = require('../documents/JournalClassToModel');
const Media = require('../documents/MediaClassToModel');

module.exports = patron => {
    let user = {
        _id: patron.innerId,
        first_name: patron.firstName,
        last_name: patron.lastName,
        type: patron.type,
        birth_date: patron.birthDate,
        phone: patron.phone
    };

    user.email = (patron.email) ? patron.email : undefined;
    user.occupation = (patron.occupation) ? patron.occupation : undefined;
    user.about = (patron.about) ? patron.about : undefined;
    user.telegram = (patron.telegram) ? patron.telegram : undefined;
    user.avatar = (patron.avatar) ? patron.avatar : undefined;
    user.address = (patron.address) ? patron.address : undefined;

    let taken_documents = [];
    if (patron.takenDocuments){
        for (let i = 0; i < patron.takenDocuments.length; i++) {
            // let
        }
    }


    return user;
};