/**
 * Created by Danny on 5/2/2017.
 */
import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import configServ from '../../config/config.js';
import database from '../database/dataBase.js';
//import dbconfig from '../../config/config';
const host = configServ.express.ip;
const port = configServ.express.port;
export default class WebServer{
    constructor () {
        this.app = express();
        this.httpServer = http.Server(this.app);
        /*this.httpServer = http.createServer((req,res,next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        });*/
        this.io = socketio(this.httpServer);
        this.router = express.Router();
        this.openHttpConnections = {};
        //this.host = configServ.express.ip;
        //this.port = configServ.express.port;
    }

    initWebServer () {
        this.httpServer.listen(configServ.express.port,configServ.express.ip, function() {
               console.log('Servidor Web escuchando en http://%s:%s', host, port);
        });

        //inicializa pool de conexiones

        database.createPool(configServ.db)
            .then(function() {
                console.log('Servidor Web inicializado con pool en http://%s:%s', host, port);

            })
            .catch(function(err) {
                console.error('Error occurred creating database connection pool', err);
                console.log('Exiting process');
                process.exit(0);
            });
        /*
        this.httpServer.on('connection', function(conn) {
            var key = configServ.express.ip + ':' + (configServ.express.port || '');

            this.openHttpConnections[key] = conn;

            conn.on('close', function() {
                delete this.openHttpConnections[key];
            });
        });
        */

    }

    getRouter(){
        return this.router;
    }
    handleError () {
        //console.error(err);
        //res.status(500).send({error: 'An error has occurred, please contact support if the error persists'});
        this.shutdown();//process would usually be restarted via something like https://github.com/foreverjs/forever
    }


    shutdown() {
        console.log('Shutting down');
        console.log('Closing web server');

        this.httpServer.close(function () {
            console.log('Web server closed');

        });

        /*for (key in openHttpConnections) {
            openHttpConnections[key].destroy();
        }*/
    }
}




