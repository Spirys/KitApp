'use strict';

const Author = require('./AuthorClassToModel');
const MediaInstance = require('./DocumentInstanceClassToModel');

module.exports = media => {
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

    let mediaModel = {
        _id: media.innerId,
        title: media.title,
        authors: authors,
        instances: instances,
        cost: media.cost,
        keywords: media.keywords
    };

    mediaModel.bestseller = (media.isBestseller != null || media.isBestseller !== undefined) ? media.isBestseller : undefined;
    mediaModel.description = (media.description) ? media.description : undefined;
    mediaModel.image = (media.image) ? media.image : undefined;
    mediaModel.published = (media.published) ? media.published : undefined;

    return mediaModel;
};