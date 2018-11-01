const _ = require('underscore');
const dbService = require('../include/database');
const appConfig = require('../include/appconfig');
const utils = require('../include/utilities');
const moment = require('moment-timezone');

module.exports = () => {
    global.app.post('/v1/postbook', (req, res, next) => {
        var postObj = req.body;
       
        if (postObj && postObj.hasOwnProperty('bookName') && postObj.hasOwnProperty('author') && postObj.hasOwnProperty('quantity')) {
            // var bookName = utils.isNameValid(postObj.bookName);
            // var author = utils.isNameValid(postObj.author);
            console.log( console.log(postObj));
            if (['', undefined, 'undefined', null, 'null'].indexOf(postObj) == -1 && (postObj.bookName) && (postObj.author)) {
                dbService.findDocs('books', {
                    bookName: postObj.bookName,
                    author: postObj.author,
                    status: true
                }).then(async (bookArray) => {
                    if (bookArray && bookArray instanceof Array && bookArray.length > 0) {
                        res.status(302).send({
                            status: 1,
                            message: 'error',
                            messageText: 'Book with author already exist!'
                        });
                    } else {
                        // *********************************************************************
                        var payload = {
                            bookId: await utils.getNextSequenceValue('books'),
                            bookName: postObj.bookName,
                            author: postObj.author,
                            quantity: postObj.quantity,
                            publishedTime: moment().toDate('YYYY-MM-DD HH:mm:ss'),
                            createdTime: moment().toDate('YYYY-MM-DD HH:mm:ss'),
                            status: true
                        }
                        var insertUser = await utils.insertDocInDb('books', payload);
                        if (insertUser) {
                            res.status(200).send({
                                status: 1,
                                message: 'success',
                                messageText: 'Posted successful!'
                            });
                        } else {
                            res.status(503).send({
                                status: 1,
                                message: 'error',
                                messageText: 'Post failed!, Please try after some time.'
                            });
                        }
                        // *********************************************************************
                    }
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