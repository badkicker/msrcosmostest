const _ = require('underscore');
const dbService = require('../include/database');
const appConfig = require('../include/appconfig');
const utils = require('../include/utilities');
const moment = require('moment-timezone');

module.exports = () => {
    global.app.delete('/v1/deletebook/:bookid', (req, res, next) => {
        var postObj = req.params.bookid;
console.log(postObj);
        if (postObj) {
            // var bookName = postObj.bookName;
            // var author = postObj.author;

            if (['', undefined, 'undefined', null, 'null'].indexOf(postObj) == -1) {
                dbService.removeDocBy('books', {
                    bookId: postObj
                }, ).then(async (bookArray) => {

                    res.status(200).send({
                        status: 1,
                        message: 'success',
                        messageText: 'deleted successful!'
                    });

                    // *********************************************************************

                }, (error) => {
                    res.status(500).send({
                        status: 0,
                        message: 'error',
                        messageText: appConfig.errorMessages.somethingWentWrong
                    });
                });
            } else {

                res.status(400).send({
                    status: 0,
                    message: 'error',
                    messageText: appConfig.errorMessages.invalidInputs
                });

            }
        } else {

            res.status(400).send({
                status: 0,
                message: 'error',
                messageText: appConfig.errorMessages.badRequest
            });
        }
    }, (error) => {
        res.status(500).send({
            status: 0,
            message: 'error',
            messageText: appConfig.errorMessages.somethingWentWrong
        });
    });
};