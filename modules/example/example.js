import Component from '../../core/model/component.js';
export default class Example extends Component  {
    constructor () {
        super('employees','HR','EMPLOYEES');
    }
    findAll(req,res){
        console.log("*********");
        console.log("Example GET ALL");
        console.log("*********");
        this.setAlias({
            EMPLOYEE_ID: {alias: 'ID'}
        });
        var filter = {
            nEmployee_Id: {col: 'EMPLOYEE_ID',type: 'NUMBER',operator: '=', val: req.query.nEmployee_Id}
        }
        this.setFilter(filter);
        this.getSelectView('EMPLOYEES_VIEW','EMPLOYEE_ID','EMPLOYEE_ID',req, res);
    }
    findId(req,res){
        console.log("*********");
        console.log("Example FIND ID");
        console.log("*********");
        this.getSelectID('EMPLOYEES','EMPLOYEE_ID',req.params.id,req, res);
    }
   findList(req,res){
        console.log("*********");
        console.log("Example FIND LIST");
        console.log("*********");
        this.getSelectCodVal('EMPLOYEES','EMPLOYEE_ID',"FIRST_NAME||' ' ||LAST_NAME",'EMPLOYEE_ID',req, res);
    }
    suma(req,res){
        console.log("***********************");
        console.log("SUMA DOS NÚMEROS");
        console.log("***********************");
        var plsql = "BEGIN :nRetorno := HR.DB_SUMA_JS(:nArgumento1,:nArgumento2);END;";
        var bind = {
            nArgumento1: {type: 'NUMBER', dir: 'IN', val: req.body.nArgumento1},
            nArgumento2: {type: 'NUMBER', dir: 'IN', val: req.body.nArgumento2},
            nRetorno:  { type: 'NUMBER', dir: 'OUT'}
        }
        this.executePlsql(plsql, bind,req, res);
    }




}