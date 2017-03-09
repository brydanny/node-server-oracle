/**
 * Created by dchambi on 01/03/2017.
 */
import Orm from './orm.js';
export default class Component{
    constructor(name,schema,tableName){
        this.name = name;
        this.schema = schema;
        this.tableName = tableName;
        this.orm = new Orm();
        this.alias = {};
        this.filter = '';

    }
    setAlias(objAlias){
        this.alias = objAlias;

    }
    setFilter(objFilter){
        if ( typeof objFilter !== 'undefined' && objFilter )
        {   //console.log(objFilter);
            //console.log("----------");
            //console.log("where");
            //console.log("----------");
            var where = '' ;
            for(var x in objFilter) {
                if ( typeof objFilter[x].val !== 'undefined' && objFilter[x].val ){
                    var isUpper = false;
                    if(typeof objFilter[x].convert !== 'undefined' && objFilter[x].convert){
                        if(objFilter[x].convert == 'UPPER') {
                            isUpper = true;
                        }
                    }
                    if(where == '' ){
                        where = ' WHERE ';
                    }else {
                        where = where + ' AND ';
                    }
                    var islike = false;
                    if(typeof objFilter[x].operator !== 'undefined' && objFilter[x].operator == 'LIKE'){
                        islike = true;
                    }
                    if(isUpper){
                       objFilter[x].col = 'UPPER(A.'+objFilter[x].col+')';
                    }else{
                       objFilter[x].col = 'A.'+objFilter[x].col;
                    }
                    where = where + objFilter[x].col + ' '+ objFilter[x].operator + ' ';
                    if(objFilter[x].type = 'STRING'){
                        if(islike){
                            objFilter[x].val =  "'%" + objFilter[x].val + "%'";
                        }else {
                            objFilter[x].val =  "'" + objFilter[x].val + "'";
                        }
                        if(isUpper){
                            objFilter[x].val =  "UPPER(" + objFilter[x].val + ")";
                        }
                        where = where +  objFilter[x].val;
                    } else {
                        where = where +  parseInt(objFilter[x].val);
                    }
                }

            };
            //console.log(where);
            this.filter = where;
        }
    }
    setPathName(req){
        //return req.baseUrl;
        var ParQuery = req.query;
        var pathBase = '';
        for(var key in ParQuery) {

            if(key != 'per_page' && key != 'offset' ){
                if (pathBase == ''){
                    pathBase = '?';
                }else{
                    pathBase = '&';
                }
                pathBase = pathBase + key + '=' + ParQuery[key];
            }
        }
        pathBase = req.baseUrl + pathBase;
        return pathBase;
    }
    getSelect(req, res, next){
        //console.log("PER_PAGE: " + req.query.per_page);
        //console.log("OFFSET: " + req.query.offset);
        //console.log(req._parsedUrl.pathname);
        //var orm = new Orm();
        this.orm.setResponseSelect(this.schema, this.tableName,this.alias,this.filter,req.query.per_page,req.query.offset,'employee_id',this.setPathName(req)).then(function (response) {
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
        this.orm.setResponseSelectView(this.schema, viewName,id,this.alias,this.filter,req.query.per_page,req.query.offset,orderBy,this.setPathName(req)).then(function (response) {
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
        this.orm.setResponseSelectCodVal(this.schema, viewName,codigo,valor,this.alias,this.filter,orderBy).then(function (response) {
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
    executePlsql(plsql, bindvars,req, res){
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
