const _ = require('underscore');
const dbService = require('../include/database');
const appConfig = require('../include/appconfig');
const utils = require('../include/utilities');
const moment = require('moment-timezone');

module.exports = () => {
    global.app.put('/v1/putbook', (req, res, next) => {
        var postObj = req.body;

        if (postObj && postObj.hasOwnProperty('bookName') && postObj.hasOwnProperty('author') && postObj.hasOwnProperty('quantity')) {
            var bookName = postObj.bookName;
            var author = postObj.author;

            if (['', undefined, 'undefined', null, 'null'].indexOf(postObj) == -1) {
                dbService.findOneAndSetDoc('books', {
                    bookId: postObj.bookId
                }, {
                    bookName: bookName,
                    author: author,
                    quantity: postObj.quantity
                }).then(async (bookArray) => {

                    res.status(200).send({
                        status: 1,
                        message: 'success',
                        messageText: 'Update successful!'
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