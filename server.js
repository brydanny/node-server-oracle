/**
 * Created by dchambi on 02/02/2017.
 */
import bodyParser from 'body-parser';
import logger from 'morgan';
import serveStatic from 'serve-static';
//import socketio from 'socket.io';
import oracledb from 'oracledb';
import Config from './config/config.js';
import WebServer from './core/server/webServer.js';

var app;
var io;
import Employees from './modules/employees/employees';
import Job_History from './modules/job_history/job_history';
import Component from './core/model/component.js';
import Router from './core/router';
//import connectData from './core/database/dataBase';
/*
var httpServer;

*/
inicializaWebServer();

function inicializaWebServer() {

    var webServer = new WebServer();
    webServer.initWebServer();
    app = webServer.app;
    //const route = webServer.getRouter();
    app.use(logger('combined'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //*****************************************************************
    //Crea end points para la aplicación
    //*****************************************************************
    //app.use(webServer.setRequest(req, res, next));
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
    //app.use('/prueba/', require('./core/router'));
    app.use('/api/',require('./core/router'));
    //require('./core/router')(webServer);

}

