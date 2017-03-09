/**
 * Created by Danny on 27/2/2017.
 */
import Column from './column.js';
import configPage from '../../config/config.js';
var oracledb = require('oracledb');
var Promise = require('es6-promise').Promise;

export default class Table{
    constructor (connectData, schema, tableName) {
        this.connection = connectData;
        this.schema = schema;
        this.tableName = tableName;
        //this.columns = objColumns;
        this.columns = {};
        //this.primaryKey = primaryKey;
        this.primaryKey = null;
        ///this.alias = {};
        this.bindVars = {STRING :oracledb.STRING,
                         NUMBER :oracledb.NUMBER,
                         DATE: oracledb.DATE,
                         IN:oracledb.BIND_IN,
                         OUT:oracledb.BIND_OUT
                        }
        this.bindDir = {IN :oracledb.BIND_IN ,
                        INOUT :oracledb.BIND_INOUT,
                        OUT: oracledb.BIND_OUT
                        }
        this.maxRowsDefault = configPage.pagination.maxRowsDefault;
    }
    /*
    setAlias(nameCol,aliasCol){
        this.alias[nameCol] = new Alias(nameCol, aliasCol);
    }
    */
    getColumns() {
        var self = this;
        return new Promise(function (resolve, reject) {
            //var columns = {};
            self.connection.simpleExecute(
                'SELECT COLUMN_NAME,DATA_TYPE,DATA_LENGTH FROM ALL_TAB_COLUMNS WHERE TABLE_NAME=:1 AND OWNER = :2 ORDER BY COLUMN_ID',
                [self.tableName, self.schema],   //{}, //no binds
                {
                    outFormat: self.connection.OBJECT
                }
            ).then(function (results) {
                for (var i = 0; i < results.rows.length; i++) {
                    self.columns[results.rows[i]['COLUMN_NAME']] = new Column(results.rows[i]['COLUMN_NAME'], results.rows[i]['DATA_TYPE'], results.rows[i]['DATA_LENGTH']);

                }
                /*console.log("----------");
                console.log("GET COLUMNS");
                console.log("----------");
                console.log(self.columns);*/
                resolve(self.columns);

            }).catch(function (err) {
                console.log("----------");
                console.log("ERROR- GET COLUMNS");
                console.log("----------");
                console.log("Error:" + err);
                if (err) {
                    //return reject(err);
                    resolve("Error:" + err.message);
                }

            });
        });
    }
    getPrimaryKey() {
        var self = this;
        return new Promise(function (resolve, reject) {
            //var pkAtrCol = null;
            self.connection.simpleExecute(
                "SELECT T.CONSTRAINT_NAME AS CONSTRAINT_NAME, C.COLUMN_NAME AS COLUMN_NAME FROM ALL_CONSTRAINTS T, ALL_CONS_COLUMNS C WHERE T.OWNER = C.OWNER AND T.CONSTRAINT_NAME = C.CONSTRAINT_NAME AND T.TABLE_NAME = :1 AND T.OWNER = :2 AND T.CONSTRAINT_TYPE='P'",
                [self.tableName, self.schema],   //{}, //no binds
                {
                    outFormat: self.connection.OBJECT
                }
            ).then(function (results) {
                //console.log(results);
                self.primaryKey = results.rows[0]['COLUMN_NAME'];
                /*console.log("----------");
                console.log("GET PRIMARY KEY");
                console.log("----------");
                console.log(self.primaryKey);*/
                resolve(self.primaryKey);

            }).catch(function (err) {
                console.log("----------");
                console.log("ERROR- GET PRIMARY KEY");
                console.log("----------");
                console.log("Error:" + err);
                if (err) {
                    //return reject(err);
                    resolve("Error:" + err.message);
                }

            });
        });
    }
    getRows(maxNumRows, offset,cWhere,orderBy){
        var self = this;
        var sql;
        return new Promise(function (resolve,reject) {
            sql = "SELECT A.*, COUNT(*) OVER()NUMREG FROM " + self.schema + "."+ self.tableName + " A " + cWhere +" ORDER BY A." + orderBy;
            console.log("sql previo: " + sql);
            if(self.connection.oracleServerVersion > 1201000000){
                // 12c row-limiting syntax
                sql += " OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY";
            } else{
                // Pre-12c syntax [could also customize the original query and use row_number()]
                sql = "SELECT * FROM (SELECT B.*, ROWNUM AS MY_RNUM FROM"
                    + "(" + sql + ") B "
                    + "WHERE ROWNUM <= :maxnumrows + :offset) WHERE MY_RNUM > :offset";
            }
            self.connection.simpleExecute(
                sql,
                {offset: offset, maxnumrows: maxNumRows}, //no binds
                {
                    outFormat: self.connection.OBJECT,
                    maxRows: self.maxRowsDefault
                }
            ).then(function (results) {
                /*console.log("----------");
                console.log("GET ROWS");
                console.log("----------");
                console.log(results);*/
                resolve(results);

            }).catch(function (err) {
                console.log("----------");
                console.log("ERROR- GET ROWS");
                console.log("----------");
                console.log("sql: " + sql);
                console.log("Error:" + err.message);
                if (err) {
                    //return reject(err.message);
                    resolve("Error:" + err.message);
                }

            });

        });
    }
    getRowsCodVal(nameColCod,nameColVal,orderBy){
        var self = this;
        var sql;
        return new Promise(function (resolve,reject) {
            //sql = "SELECT A.*, COUNT(*) OVER()NUMREG FROM " + self.schema + "."+ self.tableName + " A ORDER BY A." + orderBy;
            sql = 'SELECT '+nameColCod+' as "value",'+nameColVal+' as "label" FROM ' + self.schema + '.'+ self.tableName + ' ORDER BY ' + orderBy;
            console.log("sql previo: " + sql);
            /*if(self.connection.oracleServerVersion > 1201000000){
                // 12c row-limiting syntax
                sql += " OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY";
            } else{
                // Pre-12c syntax [could also customize the original query and use row_number()]
                sql = "SELECT * FROM (SELECT B.*, ROWNUM AS MY_RNUM FROM"
                    + "(" + sql + ") B "
                    + "WHERE ROWNUM <= :maxnumrows + :offset) WHERE MY_RNUM > :offset";
            }*/
            self.connection.simpleExecute(
                sql,
                {}, //no binds
                {
                    outFormat: self.connection.OBJECT,
                    maxRows: self.maxRowsDefault
                }
            ).then(function (results) {
                /*console.log("----------");
                 console.log("GET ROWS COD VAL");
                 console.log("----------");
                 console.log(results);*/
                resolve(results);

            }).catch(function (err) {
                console.log("----------");
                console.log("ERROR- GET ROWS COD VAL");
                console.log("----------");
                console.log("sql: " + sql);
                console.log("Error:" + err.message);
                if (err) {
                    //return reject(err.message);
                    resolve("Error:" + err.message);
                }

            });

        });
    }
    getRowsID(ID, valueID){
        var self = this;
        var sql;
        return new Promise(function (resolve,reject) {
            sql = "SELECT A.* FROM " + self.schema + "."+ self.tableName + " A WHERE A." + ID + "= :valueID";
            console.log("sql previo: " + sql);
            self.connection.simpleExecute(
                sql,
                {valueID: valueID}, //no binds
                {
                    outFormat: self.connection.OBJECT,
                }
            ).then(function (results) {
                /*console.log("----------");
                 console.log("GET ROWS ID");
                 console.log("----------");
                 console.log(results);*/
                resolve(results);

            }).catch(function (err) {
                console.log("----------");
                console.log("ERROR- GET ROWS ID");
                console.log("----------");
                console.log("sql: " + sql);
                console.log("Error:" + err.message);
                if (err) {
                    //return reject(err.message);
                    resolve("Error:" + err.message);
                }

            });

        });
    }
    getResultPlsql(plsql, bindvars){
        var self = this;
        return new Promise(function (resolve,reject) {
            console.log("sql previo: " + plsql);
            for (var key in bindvars){
                 var typeProp = bindvars[key].type;
                 var dirProp = bindvars[key].dir;
                 //console.log('pueba: ' + bindvars[key].type + '-' + bindvars[key].type + '-' + self.bindVars[typeProp]);
                 //console.log('prueba: ' + bindvars[key].dir + '-' + bindvars[key].dir + '-' + self.bindVars[dirProp]);
                 bindvars[key].type = self.bindVars[typeProp];
                 bindvars[key].dir = self.bindVars[dirProp];
             }
             console.log(bindvars);

            self.connection.simpleExecute(
                plsql,
                bindvars,
                {
                    outFormat: self.connection.OBJECT
                }
            ).then(function (results) {
                console.log("----------");
                 console.log("GET RESULT PLSQL");
                 console.log("----------");
                 console.log(results);
                resolve(results.outBinds);

            }).catch(function (err) {
                console.log("----------");
                console.log("ERROR- RESULT PLSQL");
                console.log("----------");
                console.log("sql: " + plsql);
                console.log("Error:" + err.message);
                if (err) {
                    //return reject(err.message);
                    resolve("Error:" + err.message);
                }
            });
        });
    }
}