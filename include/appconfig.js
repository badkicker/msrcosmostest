'use strict';
const session = require('express-session');
//Set environment('development' || 'production')//
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}
var appConfig;
if (process.env.NODE_ENV == 'development') {
    var MongoStore = require('connect-mongo')(session);
    appConfig = {
        consoleMsg: 'Development configuration loaded.',
        serverConfig: {
            address: 'http://localhost',
            port: process.env.PORT || 3001,
            options: {
                CORS: {
                    authTokenHeaders: ['kt-auth-token']
                }
            }
        },
        databaseConfig: {
            url: 'mongodb://localhost:27017/msr-db',
        },
        sessionConfig: {
            sessionPayload: {
                secret: 'dsfgrsdt54e6te5yfbfdy456457y64yuhfghf5',
                proxy: true,
                resave: true,
                saveUninitialized: true,
                store: new MongoStore({
                    url: 'mongodb://localhost:27017/msr-db',
                    db: 'msr-db',
                    host: 'localhost',
                    port: 27017, // optional, default: 27017
                    username: '', // optional
                    password: '', // optional
                    collection: 'userSessionLog', // optional, default: sessions
                    auto_reconnect: true
                })
            }
        },
        passwordsaltRounds: 10,
        errorMessages: {
            invalidInputs: 'Oops!...Please fill in valid details!',
            somethingWentWrong: 'Oops!...Something went wrong. Please reload the page and try again.',
            badRequest: 'Oops!...This seems to be a bad request. Please reload the page and try again.',
            invalidOtp: 'Oops!...The OTP entered is incorrect.',
            invalidPassword: 'Oops!...Please enter valid credentials!'
        }
    };
} else if (process.env.NODE_ENV == 'production') {
    appConfig = {
        consoleMsg: 'Production configuration loaded.',
        serverConfig: {
            address: '//server.caterbinge.com',
            port: process.env.PORT || 3600,
            options: {
                CORS: {
                    authTokenHeaders: ['kt-auth-token']
                }
            }
        },
        databaseConfig: {
            url: 'mongodb://<ramakrishna>:<msr@555>@ds147723.mlab.com:47723/msr-db',
        },
        sessionConfig: {
            sessionPayload: {
                secret: 'dgsdgdsgdsfgfdg$^$%^%4hdvbsjbdishvsdb',
                proxy: true,
                resave: true,
                saveUninitialized: true,
            }
        },
        passwordsaltRounds: 10,
        errorMessages: {
            invalidInputs: 'Oops!...Please fill in valid details!',
            somethingWentWrong: 'Oops!...Something went wrong. Please reload the page and try again.',
            badRequest: 'Oops!...This seems to be a bad request. Please reload the page and try again.',
            invalidOtp: 'Oops!...The OTP entered is incorrect.',
            invalidPassword: 'Oops!...Please enter valid credentials!'
        }
    };
};

module.exports = appConfig;