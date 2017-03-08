import Component from '../../core/model/component.js';
export default class Example extends Component  {
    constructor () {
        super('example','HR','EMPLOYEES');
    }
    findAll(req,res){
        console.log("*********");
        console.log("Employees GET ALL");
        console.log("*********");
        this.setAlias('EMPLOYEE_ID','ID');
        this.getSelectView('EMPLOYEES_VIEW','EMPLOYEE_ID','EMPLOYEE_ID',req, res);
    }
    findId(req,res){
        console.log("*********");
        console.log("Employees FIND ID");
        console.log("*********");
        this.getSelectID('EMPLOYEES_VIEW','EMPLOYEE_ID',req.params.id,req, res);
    }
   findList(req,res){
        console.log("*********");
        console.log("Employees FIND LIST");
        console.log("*********");
        this.getSelectCodVal('EMPLOYEES','EMPLOYEE_ID',"FIRST_NAME||' ' ||LAST_NAME",'EMPLOYEE_ID',req, res);
    }
    add(req,res){
        console.log("*********");
        console.log("Employees ADD");
        console.log("*********");
        var plsql = "BEGIN :cRetorno := HR.DB_ABM_DEPLOYEES(:nEmployee_Id,:cFirst_Name);END;";
        var bind = {
            nEmployee_Id: {type: 'NUMBER', dir: 'IN', val: req.body.nEmployee_Id},
            cFirst_Name: { type: 'STRING', dir: 'IN', val: req.body.cFirst_Name},
            cRetorno:  { type: 'STRING', dir: 'OUT', maxSize: 4000 }
        }
        this.getAbm(plsql, bind,req, res);
    }
    update(req,res){
        console.log("*********");
        console.log("Employees UPDATE");
        console.log("*********");
        var plsql = "BEGIN :cRetorno := HR.DB_ABM_DEPLOYEES(:nEmployee_Id,:cFirst_Name);END;";
        req.params.id = parseInt(req.params.id);
        var bind = {
            nEmployee_Id: {type: 'NUMBER', dir: 'IN', val: req.params.id},
            cFirst_Name: { type: 'STRING', dir: 'IN', val: req.body.cFirst_Name},
            cRetorno:  { type: 'STRING', dir: 'OUT', maxSize: 4000 }
        }
        this.getAbm(plsql, bind,req, res);
    }
    delete(req,res){
        console.log("*********");
        console.log("Employees UPDATE");
        console.log("*********");
        var plsql = "BEGIN :cRetorno := HR.DB_ABM_DEPLOYEES(:nEmployee_Id,:cFirst_Name);END;";
        req.params.id = parseInt(req.params.id);
        var bind = {
            nEmployee_Id: {type: 'NUMBER', dir: 'IN', val: req.params.id},
            cFirst_Name: { type: 'STRING', dir: 'IN', val: req.body.cFirst_Name},
            cRetorno:  { type: 'STRING', dir: 'OUT', maxSize: 4000 }
        }
        this.getAbm(plsql, bind,req, res);
    }




}