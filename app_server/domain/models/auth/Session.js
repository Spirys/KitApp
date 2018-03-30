'use strict';

const Session = {
    name: 'Session',
    primaryKey: 'token',
    properties: {
        user: 'User',
        token: 'string',
        expires: 'date'
    }
};

module.exports = Session;