/**
 * Created by dchambi on 24/02/2017.
 */
//import connectData from '../../core/dataBase.js';
//import Column from './response/column.js';
import Table from '../database/table.js';
import Meta from '../response/meta.js';
import Response from '../response/response.js';
import configPage from '../../config/config.js';
var Promise = require('es6-promise').Promise;
import connectData from '../database/dataBase.js';
export default class Orm {
    constructor() {
        this.connection = connectData;
        //this.columns = {};
        //this.pkAtrCol = null;
        this.table = null;
        this.limitSelectDefault = configPage.pagination.limitSelectDefault;
        this.offsetSelectDefault = configPage.pagination.offsetSelectDefault;
    }

    setResponseSelect(schema, tableName,objAlias,maxNumRows, offset,orderBy,pathName){
        var table;
        var meta;
        var response;
        var self = this;
        return new Promise(function (resolve, reject) {
            table = new Table(self.connection,schema,tableName);
            table.getColumns().then(function (columns) {
             table.getPrimaryKey().then(function (pkAtrCol) {
                 //set limit, offset, orderBy
                 var limitSelect;
                 if(maxNumRows){
                     limitSelect = maxNumRows;
                 } else{
                     limitSelect = self.limitSelectDefault;
                 }

                 var offsetSelect;
                 if(offset){
                     offsetSelect = offset;//req.query.page - 1;
                 } else{
                     offsetSelect = self.offsetSelectDefault;
                 }
                 var orderBySelect;
                 if(orderBy){
                     orderBySelect = orderBy;
                 } else{
                     orderBySelect = pkAtrCol;
                 }
                 var offsetPrevious = parseInt(offsetSelect) - parseInt(limitSelect);
                 var offsetNext = parseInt(offsetSelect) + parseInt(limitSelect);
                 //console.log("number: " + offsetNext);
                 table.getRows(limitSelect, offsetSelect,orderBySelect).then(function (results) {
                     var nextUrl;
                     if(offsetNext < results.rows[0]['NUMREG']){
                         nextUrl = pathName + '?per_page=' + limitSelect + '&offset=' + offsetNext;
                     }
                     else{
                         nextUrl = null;
                     }
                     var previousUrl;
                     if(offsetPrevious >= 0){
                         previousUrl = pathName + '?per_page=' + limitSelect + '&offset=' + offsetPrevious;
                     }
                     else{
                         previousUrl = null;
                     }
                     var cols = [];
                     for(var x in columns){
                         cols.push(columns[x]);
                         var nomElem = columns[x].name;
                         if (objAlias[nomElem]){
                             columns[x].alias = objAlias[nomElem].alias;
                         }
                     };
                     meta = new Meta(tableName,cols,pkAtrCol,results.rows.length,offsetSelect,previousUrl,nextUrl,results.rows[0]['NUMREG']);
                     response = new Response(meta,results.rows);
                     /*console.log("----------");
                     console.log("SET RESPONSE");
                     console.log("----------");
                     console.log(response);*/
                     resolve(response);

                 }).catch(function(err) {
                     console.log("----------");
                     console.log("ERROR - SET REPONSE GETROWS");
                     console.log("----------");
                     console.log("Error:" + err.message);
                     if (err) {
                         //return reject(err);
                         var previousUrl;
                         if(offsetPrevious >= 0){
                             previousUrl = pathName + '?per_page=' + limitSelect + '&offset=' + offsetPrevious;
                         }
                         else{
                             previousUrl = null;
                         }
                         meta = new Meta(tableName,columns,pkAtrCol,0,offsetSelect,previousUrl,null,0);
                         response = new Response(meta,[]);
                         resolve(response);
                     }

                 });
             });
            });
        });
    }
    setResponseSelectView(schema, viewName,id,objAlias,maxNumRows, offset,orderBy,pathName){
        var view;
        var meta;
        var response;
        var self = this;
        return new Promise(function (resolve, reject) {
            view = new Table(self.connection,schema,viewName);
            view.getColumns().then(function (columns) {
                    //set limit, offset, orderBy
                    var limitSelect;
                    if(maxNumRows){
                        limitSelect = maxNumRows;
                    } else{
                        limitSelect = self.limitSelectDefault;
                    }

                    var offsetSelect;
                    if(offset){
                        offsetSelect = offset;//req.query.page - 1;
                    } else{
                        offsetSelect = self.offsetSelectDefault;
                    }
                    var orderBySelect;
                    if(orderBy){
                        orderBySelect = orderBy;
                    } else{
                        orderBySelect = id;
                    }
                    var offsetPrevious = parseInt(offsetSelect) - parseInt(limitSelect);
                    var offsetNext = parseInt(offsetSelect) + parseInt(limitSelect);
                    //console.log("number: " + offsetNext);
                    view.getRows(limitSelect, offsetSelect,orderBySelect).then(function (results) {
                        var nextUrl;
                        if(offsetNext < results.rows[0]['NUMREG']){
                            nextUrl = pathName + '?per_page=' + limitSelect + '&offset=' + offsetNext;
                        }
                        else{
                            nextUrl = null;
                        }
                        var previousUrl;
                        if(offsetPrevious >= 0){
                            previousUrl = pathName + '?per_page=' + limitSelect + '&offset=' + offsetPrevious;
                        }
                        else{
                            previousUrl = null;
                        }
                        var cols = [];
                        for(var x in columns){
                            cols.push(columns[x]);
                            var nomElem = columns[x].name;
                            if (objAlias[nomElem]){
                                columns[x].alias = objAlias[nomElem].alias;
                            }
                        };
                        meta = new Meta(viewName,cols,id,results.rows.length,offsetSelect,previousUrl,nextUrl,results.rows[0]['NUMREG']);
                        response = new Response(meta,results.rows);
                        /*console.log("----------");
                        console.log("SET RESPONSE");
                        console.log("----------");
                        console.log(response);*/
                        resolve(response);

                    }).catch(function(err) {
                        console.log("----------");
                        console.log("ERROR - SET REPONSE GETROWS");
                        console.log("----------");
                        console.log("Error:" + err.message);
                        if (err) {
                            //return reject(err);
                            var previousUrl;
                            if(offsetPrevious >= 0){
                                previousUrl = pathName + '?per_page=' + limitSelect + '&offset=' + offsetPrevious;
                            }
                            else{
                                previousUrl = null;
                            }
                            meta = new Meta(viewName,columns,id,0,offsetSelect,previousUrl,null,0);
                            response = new Response(meta,[]);
                            resolve(response);
                        }

                    });
            });
        });
    }
    setResponseSelectCodVal(schema, viewName,codigo,valor,objAlias,orderBy){
        var view;
        var meta;
        var response;
        var self = this;
        return new Promise(function (resolve, reject) {
            view = new Table(self.connection,schema,viewName);
            view.getColumns().then(function (columns) {
                //set limit, offset, orderBy
                var orderBySelect;
                if(orderBy){
                    orderBySelect = orderBy;
                } else{
                    orderBySelect = codigo;
                }
                view.getRowsCodVal(codigo, valor,orderBySelect).then(function (results) {
                    var cols = [];
                    for(var x in columns) {

                        if (columns[x].name == codigo || columns[x].name == valor){
                            cols.push(columns[x]);
                            var nomElem = columns[x].name;
                            if (objAlias[nomElem]){
                                columns[x].alias = objAlias[nomElem].alias;
                            }
                        }

                    };
                    meta = new Meta(viewName,cols,codigo,results.rows.length,null,null,null,results.rows[0]['NUMREG']);
                    response = new Response(meta,results.rows);
                    /*console.log("----------");
                     console.log("SET RESPONSE");
                     console.log("----------");
                     console.log(response);*/
                    resolve(response);

                }).catch(function(err) {
                    console.log("----------");
                    console.log("ERROR - SET REPONSE GETROWS");
                    console.log("----------");
                    console.log("Error:" + err.message);
                    if (err) {
                        meta = new Meta(viewName,columns,codigo,0,null,null,null,0);
                        response = new Response(meta,[]);
                        resolve(response);
                    }

                });
            }).catch(function(err) {
                console.log("----------");
                console.log("ERROR - setResponseSelectCodVal getColumns");
                console.log("----------");
                console.log("Error:" + err.message);
                if (err) {
                    //return reject(err);
                    meta = new Meta(viewName,[],codigo,0,null,null,null,0);
                    response = new Response(meta,[]);
                    resolve(response);
                }

            });
        });
    }
    setResponseSelectID(schema, viewName,ID, valueID,objAlias){
        var view;
        var meta;
        var response;
        var self = this;
        return new Promise(function (resolve, reject) {
            view = new Table(self.connection,schema,viewName);
            view.getColumns().then(function (columns) {
                //set limit, offset, orderBy
                view.getRowsID(ID, valueID).then(function (results) {
                    var cols = [];
                    for(var x in columns){
                        cols.push(columns[x]);
                        var nomElem = columns[x].name;
                        if (objAlias[nomElem]){
                            columns[x].alias = objAlias[nomElem].alias;
                        }
                    };
                    meta = new Meta(viewName,cols,ID,results.rows.length,null,null,null,results.rows.length);
                    response = new Response(meta,results.rows);
                    /*console.log("----------");
                     console.log("SET RESPONSE");
                     console.log("----------");
                     console.log(response);*/
                    resolve(response);

                }).catch(function(err) {
                    console.log("----------");
                    console.log("ERROR - SET REPONSE GETROWS");
                    console.log("----------");
                    console.log("Error:" + err.message);
                    if (err) {
                        meta = new Meta(viewName,columns,id,0,null,null,null,0);
                        response = new Response(meta,[]);
                        resolve(response);
                    }

                });
            }).catch(function(err) {
                console.log("----------");
                console.log("ERROR - setResponseSelectID");
                console.log("----------");
                console.log("Error:" + err.message);
                if (err) {
                    //return reject(err);
                    meta = new Meta(viewName,[],ID,0,null,null,null,0);
                    response = new Response(meta,[]);
                    resolve(response);
                }

            });
        });
    }

    setResponsePlsql(plsql, bindvars,schema,viewName){
        var view;
        var meta;
        var response;
        var self = this;

        return new Promise(function (resolve, reject) {
            view = new Table(self.connection,schema,viewName);
            view.getResultPlsql(plsql, bindvars).then(function (results) {
                ///console.log(results.outBinds);
                //meta = new Meta(viewName,null,null,results.rows.length,null,null,null,results.rows.length);
                //meta = new Meta(viewName,null,null,null,null,null,null,results.rows.length);
                ///response = new Response(null,results.outBinds);
                response = new Response(null,results);
                /*console.log("----------");
                 console.log("SET RESPONSE");
                 console.log("----------");
                 console.log(response);*/
                resolve(response);

            }).catch(function(err) {
                console.log("----------");
                console.log("ERROR - SET REPONSE PLSQL");
                console.log("----------");
                console.log("Error:" + err.message);
                if (err) {
                    //meta = new Meta(viewName,null,null,0,null,null,null,0);
                    response = new Response(null,[]);
                    resolve(response);
                }

            });

        });
    }

}



