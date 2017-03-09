/**
 * Created by dchambi on 02/02/2017.
 */
import bodyParser from 'body-parser';
import logger from 'morgan';


import WebServer from './core/server/webServer.js';

var app;

inicializaWebServer();

function inicializaWebServer() {

    var webServer = new WebServer();
    webServer.initWebServer();
    app = webServer.app;
    app.use(logger('combined'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //*****************************************************************
    //Crea end points para la aplicación
    //*****************************************************************
    app.use(function (req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    //*****************************************************************
    //Crea end points para la aplicación
    //*****************************************************************
        app.use('/api/',require('./core/router'));


}

