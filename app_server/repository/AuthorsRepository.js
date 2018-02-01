'use strict';

function getAuthor(name) {
    return 'Stub!';
}

module.exports.getAuthor = getAuthor;
module.exports.getAuthors = function (authors) {
    if (Array.isArray(authors)) {
        let authorIds = [];
        for (let author in authors) {
            if (authors.hasOwnProperty(author)) {
                authorIds.push(getAuthor(author));
            }
        }
        return authorIds;
    } else return getAuthor(authors);
};