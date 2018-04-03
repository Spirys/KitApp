/*
 * The notification model
 * Copyright (c) 2018 KitApp project
 */

'use strict';

/**
 * The model for User
 * @private
 */

const User = {
    name: 'Notification',
    properties: {
        level: 'string',
        user: {type: 'linkingObjects', objectType: 'User', property: 'notifications'},
        text: 'string?',
        book: 'Book',
        journal: 'Journal',
        media: 'Media'
    }
};

module.exports = User;