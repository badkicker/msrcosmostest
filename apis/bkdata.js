const _ = require('underscore');
const dbService = require('../include/database');
const appConfig = require('../include/appconfig');
const utils = require('../include/utilities');
const moment = require('moment-timezone');

module.exports = () => {
    global.app.get('/v1/getbooks', (req, res, next) => {


        dbService.findDocs('books', {}).then(async (userArray) => {
            if (userArray && userArray instanceof Array && userArray.length > 0) {
                res.status(200).send({
                    status: 1,
                    message: 'success',
                    messageText: 'Books data',
                    data: userArray
                });
            } else {
                res.status(200).send({
                    status: 1,
                    message: 'success',
                    messageText: 'Books data',
                    data: []
                });
            }
        }, (error) => {
            res.status(500).send({
                status: 0,
                message: 'error',
                messageText: appConfig.errorMessages.somethingWentWrong
            });
        });


    }, (error) => {
        res.status(500).send({
            status: 0,
            message: 'error',
            messageText: appConfig.errorMessages.somethingWentWrong
        });
    });
};