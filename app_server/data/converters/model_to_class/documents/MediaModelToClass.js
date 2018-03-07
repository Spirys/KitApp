'use strict';

const Media = require('../../../../domain/models/documents/Media');
const Author = require('./AuthorModelToClass');
const MediaInstance = require('./DocumentInstanceModelToClass');

module.exports = media => {
    if (!media) {
        return null;
    }

    let authors = [];
    media.authors.forEach(aut => {
        let author = Author(aut);

        authors.push(author);
    });

    let instances = [];
    if (media.instances) {
        media.instances.forEach(inst => {
            let instance = MediaInstance(inst);

            instances.push(instance);
        });
    }

    let mediaClass = new Media(media.title, media.id, media._id, authors,
        media.cost, media.keywords);

    mediaClass.instances = instances;
    if (media.bestseller != null || media.bestseller !== undefined) mediaClass.isBestseller = media.bestseller;
    if (media.description) mediaClass.description = media.description;
    if (media.image) mediaClass.image = media.image;
    if (media.published) mediaClass.published = media.published;

    return mediaClass;
};