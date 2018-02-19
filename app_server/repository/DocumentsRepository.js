'use strict';
const config = require('../config/config');
const authorsRepository = require('./AuthorsRepository');
const usersRepository = require('./UsersRepository');
const Session = require('../models/auth/Session');
const Patron = require('../models/users/Patron');
const Book = require('../models/documents/Book');
const DocumentInstance = require('../models/documents/DocumentInstance');
const Journal = require('../models/documents/Journal');

async function findBook(title, edition, publisher) {
    return await Book.findOne({
        title: title,
        edition: edition,
        publisher: publisher
    }).exec();
}

async function getBook(id) {
    return await Book.findOne({
        $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
    }).populate('instances').populate('authors').exec();
}

async function checkOutBook(bookId, token) {
    let book = await getBook(bookId);
    let session = await Session.findOne({'_sessionId': token}).exec();
    let patron  = await Patron.findById(session.user).exec();
    if (book && patron) {
        let instances = book.instances;
        for (let i = 0; i < instances.length; i++) {
            if (instances[i].taker && instances[i].taker.toString() === patron._id.toString()) {
                return {
                    code    : config.permissionDeniedCode,
                    message : config.documentAlreadyTaken
                }
            }
        }

        for (let i = 0; i < instances.length; i++) {
            if (instances[i].status === config.statusAvailable) {
                await DocumentInstance['BookInstance'].findByIdAndUpdate(instances[i]._id, {
                    $set: {
                        status     : config.statusLoaned,
                        due_back   : Date.now() + config.loanTime(patron.type),
                        taker      : patron._id
                    }
                });

                return {
                    code    : config.okCode,
                    taker   : patron.id,
                    book    : book.id,
                    due_back: new Date(Date.now() + config.loanTime(patron.type))
                }
            }
        }
        return {code: config.errorCode, message: config.bookUnavailable}
    } else {
        return {code: config.errorCode, message: config.bookDoesNotExist};
    }
}

async function getArticle(id) {
    
}

async function getJournal(id) {

}

async function getInstancesOf(id) {
    let doc = await getBook(id);
    // TODO: make better
    if(doc == null) {
        doc = await getArticle(id);
    } else if (doc == null) {
        doc = await getJournal(id)
    }

    return doc.instances;
}

async function checkOutDocument(type, query, patron) {
    switch (type) {
        case 'book':
            return await checkOutBook(query.id, patron);
        case 'journal':
            break;
        case 'media':
            break;
        default:
            return {code:config.errorCode, message: config.invalidId};
    }
}

async function createBook(title, authors, edition, cost, publisher, keywords, status) {
    try {
        let props = {
            title: title,
            edition: edition,
            publisher: publisher,
        };

        let book = await Book.findOne(props)
                            .populate('instances')
                            .populate('authors')
                            .exec();
        if (!book || book == null || typeof book === 'undefined'){
            book = new Book({
                title: title,
                authors: authors,
                edition: edition,
                cost: cost,
                publisher: publisher,
                keywords: keywords,
                instances: []
            });
        }

        let bookInstance = await DocumentInstance['BookInstance']({status});
        await bookInstance.save();

        book.instances.push(bookInstance);
        book.markModified('instances');
        return await book.save();
    } catch (err) {
        return {code: config.errorCode, message: config.bookCreationFailed};
    }
}

async function createJournal(title, publisher, issue) {
    try {
        return await Journal.create({title, publisher, issue})
    } catch (err) {
        return {code: config.errorCode, message:config.journalCreationFailed}
    }
}

async function createDocument(document) {
    if (typeof document === 'undefined' || document === null) {
        return {code: config.errorCode, message: config.emptyDocument};
    }

    // This is a book
    else if (document.book) {
        let authors = await authorsRepository.getAuthors(document.book.authors);
        return await createBook(
            document.book.title,
            authors,
            document.book.edition,
            document.book.cost,
            document.book.publisher,
            document.book.keywords,
            document.book.status);
    }

    // This is a journal
    else if (document.journal) {
        let authors = await authorsRepository.getAuthors(document.journal.issue.editors);
        return await createJournal(
            document.journal.title,
            document.journal.publisher,
            {editors: authors, date: document.journal.date});
    }

    // This is a media-file
    else if (document.media) {


    } else return {code: config.errorCode, message: config.unknownDocument};
}

module.exports.getAllBooks = async function (length, page) {
    return await Book.find().limit(length).populate('authors').populate('instances').exec();
};

module.exports.createDocument = createDocument;

module.exports.checkOutDocument = checkOutDocument;