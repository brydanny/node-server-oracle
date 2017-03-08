/**
 * Created by dchambi on 01/03/2017.
 */
import Orm from './orm.js';
import Alias from '../database/alias.js';
export default class Component{
    constructor(name,schema,tableName){
        this.name = name;
        this.schema = schema;
        this.tableName = tableName;
        this.orm = new Orm();
        this.alias = {};

    }
    setAlias(nameCol,aliasCol){
        this.alias[nameCol] = new Alias(nameCol, aliasCol);
    }
    getSelect(req, res, next){
        //console.log("PER_PAGE: " + req.query.per_page);
        //console.log("OFFSET: " + req.query.offset);
        //console.log(req._parsedUrl.pathname);
        //var orm = new Orm();
        this.orm.setResponseSelect(this.schema, this.tableName,this.alias,req.query.per_page,req.query.offset,'employee_id',req.baseUrl).then(function (response) {
            /*console.log("----------");
            console.log("getSelect");
            console.log("----------");
            console.log(response);*/
            res.send(response);
        }).catch(function(err) {
            console.log("----------");
            console.log("ERROR - getSelect");
            console.log("----------");
            console.log("Error:" + err);
            if (err) {
                //return reject(err);
                res.send("Error:" + err);
            }

        });
        //console.log(this.columns);
    };
    getSelectView(viewName,id,orderBy,req,res){
        //console.log("PER_PAGE: " + req.query.per_page);
        //console.log("OFFSET: " + req.query.offset);
        //console.log(req._parsedUrl.pathname);
        //console.log(req);
        //console.log(req.baseUrl);
        //var orm = new Orm();
        this.orm.setResponseSelectView(this.schema, viewName,id,this.alias,req.query.per_page,req.query.offset,orderBy,req.baseUrl).then(function (response) {
            /*console.log("----------");
            console.log("getSelectView");
            console.log("----------");
            console.log(response);*/
            res.send(response);
        }).catch(function(err) {
            console.log("----------");
            console.log("ERROR - getSelectView");
            console.log("----------");
            console.log("Error:" + err);
            if (err) {
                //return reject(err);
                res.send("Error:" + err);
            }
        });
        //console.log(this.columns);

    }
    getSelectCodVal(viewName,codigo,valor,orderBy,req, res){
        //console.log("PER_PAGE: " + req.query.per_page);
        //console.log("OFFSET: " + req.query.offset);
        //console.log(req._parsedUrl.pathname);
        //var orm = new Orm();
        this.orm.setResponseSelectCodVal(this.schema, viewName,codigo,valor,this.alias,orderBy).then(function (response) {
            /*console.log("----------");
             console.log("getSelectCodVal");
             console.log("----------");
             console.log(response);*/
            res.send(response);
        }).catch(function(err) {
            console.log("----------");
            console.log("ERROR - getSelectCodVal");
            console.log("----------");
            console.log("Error:" + err);
            if (err) {
                //return reject(err);
                res.send("Error:" + err);
            }
        });
        //console.log(this.columns);

    }
    getSelectID(viewName,ID, valueID,req, res){
        //console.log("PER_PAGE: " + req.query.per_page);
        //console.log("OFFSET: " + req.query.offset);
        //console.log(req._parsedUrl.pathname);
        //var orm = new Orm();
        this.orm.setResponseSelectID(this.schema, viewName,ID,valueID,this.alias).then(function (response) {
            /*console.log("----------");
             console.log("getSelectID");
             console.log("----------");
             console.log(response);*/
            res.send(response);
        }).catch(function(err) {
            console.log("----------");
            console.log("ERROR - getSelectID");
            console.log("----------");
            console.log("Error:" + err);
            if (err) {
                //return reject(err);
                res.send("Error:" + err);
            }
        });
        //console.log(this.columns);

    }
    getAbm(plsql, bindvars,req, res){
        //console.log("PER_PAGE: " + req.query.per_page);
        //console.log("OFFSET: " + req.query.offset);
        //console.log(req._parsedUrl.pathname);
        //var orm = new Orm();
        this.orm.setResponsePlsql(plsql, bindvars,this.schema, this.tableName).then(function (response) {
            /*console.log("----------");
             console.log("getAbm");
             console.log("----------");
             console.log(response);*/
            res.send(response);
        }).catch(function(err) {
            console.log("----------");
            console.log("ERROR - getAbm");
            console.log("----------");
            console.log("Error:" + err);
            if (err) {
                //return reject(err);
                res.send("Error:" + err);
            }
        });
        //console.log(this.columns);

    }
}
