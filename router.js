const _ = require('underscore');
const utils = require('./include/utilities');
const moment = require('moment-timezone');

module.exports = () => {

    if (process.env.NODE_ENV == 'development') {
        global.app.get('/123', (req, res, next) => {
            res.status(200).send({ message: 'Hello World', });
        }, (error) => {
            res.status(500).send({ message: 'Sorry Bro!!', });
        });
    }
   

    var clientsiteFootPrint = async(req) => {
        var payload = {
            agent: await utils.getUserDeviceDetails(req.headers['user-agent']),
            ipAddressDetails: await utils.getUserIpDetails(req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                (req.connection.socket ? req.connection.socket.remoteAddress : null)),
            createdTime: moment().toDate('YYYY-MM-DD HH:mm:ss'),
        };
        var docInserted = await utils.insertDocInDb('clientFootPrint', payload);
    }

};