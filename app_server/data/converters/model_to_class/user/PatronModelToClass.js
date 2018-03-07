'use strict';

const Patron = require('../../../../domain/models/users/Patron');
const Book = require('../documents/BookModelToClass');
const Journal = require('../documents/JournalModelToClass');
const Media = require('../documents/MediaModelToClass');

// WTF
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
    if (patron.address) user.address = patron.address;

    // TODO
    let taken_documents = [];
    if (patron.taken_documents) {
        for (let i = 0; i < patron.taken_documents.length; i++) {
            let doc;
            switch (patron.taken_documents[i].kind) {
                case 'Book':
                    doc = Book(patron.taken_documents[i].doc, false);
                    break;
                case 'Journal':
                    doc = Journal(patron.taken_documents[i].doc, false);
                    break;
                case 'Media':
                    doc = Media(patron.taken_documents[i].doc, false);
                    break;
                default:
                    doc = null;
            }

            taken_documents.push({
                kind: patron.taken_documents[i].kind,
                doc: doc
            });
        }

        if (taken_documents.length > 0) {
            user.takenDocuments = taken_documents;
        }
    }

    return user;
};