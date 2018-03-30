'use strict';

const Login = {
    name: 'Login',
    primaryKey: 'login',
    properties: {
        login: 'string',
        user: 'User',
        password: 'string'
    }
};

module.exports = Login;