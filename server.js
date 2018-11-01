'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const utilities = require('./include/utilities');
const appConfig = require('./include/appconfig');
const path = require('path');

var compression = require('compression');

global.app = express();

global.app.use(compression());

var server = require('http').createServer(global.app )
/*********************************************************************/
console.log(appConfig.consoleMsg); // Logs environment in which server is running Or which configuration was loaded.
/********************************************************************/

/**********************************Session Middleware****************/
global.app.use(session(appConfig.sessionConfig.sessionPayload));

global.app.use(function(req, res, next) {
    res.session = req.session;
    next();
});
/*********************************************************************/


/**********************Body parsing middleware **********************/
global.app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({ extended: true }));

global.app.use(function(req, res, next) {
    if (req.is('text/*')) {
        req.text = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk) { req.text += chunk });
        req.on('end', next);
    } else {
        next();
    }
});

global.app.use(function(req, res, next) {
    try {
        decodeURIComponent(req.path);
        if (req.text && utilities.isJsonString(req.text)) {
            req.body = JSON.parse(req.text);
        }
        if (req.body && typeof(req.body) === "string" && utilities.isJsonString(req.body)) {
            req.body = JSON.parse(req.body);
        }
        next();
    } catch (err) {
        if (err instanceof URIError || err instanceof TypeError || err instanceof ReferenceError || err instanceof SyntaxError) {
            if (req.method == 'GET') {
                res.redirect('/error');
            } else {
                res.status(500);
            }
        } else {
            res.redirect('/error');
        }
    }
});
/********************************************************************/


/********************Headers handler********************************/
global.app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, kt-auth-token');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});
/********************************************************************/

// global.app.use(express.static(__dirname + '/dist/'));

/***************************REST APIs******************/
(function() {
    require('./express')();
    require('./router')();
    require('./apis/userdata')();
    require('./apis/bkdata')();
    require('./apis/book')();
    require('./apis/user')();
    require('./apis/putbook')();
    require('./apis/login')();
    require('./apis/deletebook')();
})();
/********************************************************************/



global.app.get('*', (req, res) => {
    res.status(404).send({ message: '404', });
});

/********************************************************************/
var server = global.app.listen(appConfig.serverConfig.port, listen);

function listen() {
    // server.listen(appConfig.serverConfig.port)
    console.log('Server is listening on ' + appConfig.serverConfig.port);
}
/********************************************************************/
/********************************************************************/