
const _ = require('underscore');
const dbService = require('../include/database');
const appConfig = require('../include/appconfig');
const utils = require('../include/utilities');
const moment = require('moment-timezone');

module.exports = () => {
    global.app.post('/v1/login', (req, res, next) => {
        var postObj = req.body;

        if (postObj && postObj.hasOwnProperty('email') && postObj.hasOwnProperty('password')) {


            if (['', undefined, 'undefined', null, 'null'].indexOf(postObj) == -1 && utils.isEmailValid(postObj.email) && utils.isPasswordValid(postObj.password)) {
                dbService.findDocs('users', {
                    email: postObj.email,
                    password: postObj.password,
                    userType: postObj.userType,
                    status: true
                }).then(async (userArray) => {
                    if (userArray && userArray instanceof Array && userArray.length > 0) {
                        dbService.findOneAndSetDoc('users', {
                            "uid": userArray[0].uid
                        }, {
                            "lastLoginTime": moment().toDate('YYYY-MM-DD HH:mm:ss')
                        }, {
                           
                        }).then(async (res)=>{
                            console.log(res);
                        }

                        )
                        res.status(200).send({
                            status: 1,
                            message: 'sucess',
                            messageText: 'successfully logged in',
                            data: userArray
                        });
                    } else {
                        // *********************************************************************
                        res.status(401).send({
                            status: 1,
                            message: 'error',
                            messageText: 'Please register Yourself!'
                        });

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

                if (!utils.isPasswordValid('password')) {

                    res.status(400).send({
                        status: 0,
                        message: 'error',
                        messageText: appConfig.errorMessages.invalidPassword
                    });
                } else {
                    console.log(postObj, utils.isPasswordValid(postObj.password), 'kj')
                    res.status(400).send({
                        status: 0,
                        message: 'error',
                        messageText: appConfig.errorMessages.badRequest
                    });
                }

            }
        } else {
            console.log(postObj, utils.isPasswordValid(postObj.password))
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