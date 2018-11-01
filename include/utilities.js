const _ = require('underscore');
const dbService = require('./database');
const appConfig = require('./appconfig');
const moment = require('moment-timezone');
// const bcrypt = require('bcrypt');
const UAParser = require('ua-parser-js');
var rp = require('async-request');
module.exports = {

    isEmailValid: (email) => {
        try {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        } catch (err) {
            return false;
        }
    },
    isNumberValid: (number) => {
        try {
            var re = /^\d+$/;
            return re.test(number);
        } catch (err) {
            return false;
        }
    },
    isAlphaNumeric: (string) => {
        try {
            var re = /^[0-9a-zA-Z]+$/;
            return re.test(string);
        } catch (err) {
            return false;
        }
    },
    isTextValid: (string) => {
        try {
            var re = /^[a-zA-Z]+$/;
            return re.test(string);
        } catch (err) {
            return false;
        }
    },
    isTextAreaValid: (string) => {
        try {
            var re = /^[ A-Za-z0-9_@./#&+-]*$/;
            return re.test(string);
        } catch (err) {
            return false;
        }
    },
    isNameValid: (name) => {
        try {
            var re = /^[^\s][a-zA-Z\s ]{2,30}$/;
            var t = re.test(name);
            if (t) {
                var input = name;
                return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1); }) : '';
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
    isAddressValid: (address) => {
        try {
            var re = /^[a-zA-Z0-9-\/,] ?([a-zA-Z0-9-\/,]|[a-zA-Z0-9-\/,] )*[a-zA-Z0-9-\/,]$/;
            return re.test(address);
        } catch (err) {
            return false;
        }
    },
    isPhoneNumberValid: (phoneNumber) => {
        try {
            var re = /^[6789]\d{9}$/;
            return re.test(phoneNumber);
        } catch (err) {
            return false;
        }
    },
    isJsonString: (str) => {
        try {

            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;

        } catch (err) {
            return false;
        }
    },

    capitilization: (input) => {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1); }) : '';
    },

    isItemExistInArray: (item, array) => {
        try {
            array = array || [];

            return _.find(array, (eachItem) => {
                if (eachItem == item) {
                    return true;
                }
            });

        } catch (err) {
            return false;
        }
    },
    isPinCodeValid: (pinCode) => {
        try {
            var re = /^[1-9][0-9]{5}$/;
            return re.test(pinCode);
        } catch (err) {
            return false;
        }
    },
    isPasswordValid: (pass) => {
        try {
            var re = /^[a-zA-Z0-9@\#\$\&\* ]*$/   
            //  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            return re.test(pass);
        } catch (err) {
            return false;
        }
    },
    otpGenerator: () => {
        return Math.floor(1000 + Math.random() * 9000);
    },
    updateValueInDb: (collectionName, query, update, options) => {
        options = options ? options : {};
        dbService.findOneAndSetDoc(collectionName, query, update, options).catch(error => { console.log(error) });
    },
    insertDocInDb: async(collectionName, payload) => {
        var docInserted = await dbService.insertDoc(collectionName, payload).catch(error => { return false; });
        if (docInserted && typeof docInserted === 'object') {
            return true;
        } else {
            return false;
        }
    },
    consoleLog: (...args) => {
        if (process.env.NODE_ENV == 'development') {
            console.log(...args);
        }
    },
    getNextSequenceValue: async(sequenceName) => {
        var sequenceDocument = await dbService.findOneAndUpdateDoc('counters', { collection: sequenceName }, { $inc: { sequence_value: 1 } }, { new: true }).catch(error => {
            return 'CB' + moment().unix();
        });
        if (sequenceDocument && typeof sequenceDocument === 'object') {
            var year = moment().year();
            return sequenceDocument.type + year + sequenceDocument.sequence_value;
        } else {
            return 'CB' + moment().unix();
        }
    },
    generatePassphrase: async(passphrase) => {
        var salt = bcrypt.genSaltSync(appConfig.passwordsaltRounds);
        var pass = await bcrypt.hashSync(passphrase, salt);
        return pass;
    },
    comparePassphrase: async(passphrase, hash) => {
        // hash is from DB
        return bcrypt.compareSync(passphrase, hash);;
    },
    getUserIpDetails: async(ipAddress) => {
        if (ipAddress) {
            try {
                var response = await rp('http://ipinfo.io/' + ipAddress);
                if (response && response.hasOwnProperty('body')) {
                    var ipObj = await JSON.parse(response.body);
                    return ipObj;
                } else {
                    return null;
                }
            } catch (err) {
                return null;
            }
        } else {
            return null;
        }
    },
    getUserDeviceDetails: async(ua) => {
        var parser = new UAParser();
        var ua = ua; // user-agent header from an HTTP request 
        var deviceObj = await parser.setUA(ua).getResult()
        return deviceObj;
    }
};