
var express = require('express');
var router = express.Router();
router.use('/example', require('../modules/example/exampleRoot'));
module.exports = router;

/*
module.exports = function(webServer){
    const router = webServer.getRouter();
    router.use('/departament', require('../modules/departament/departamentRoot'));
    router.use('/employees', require('../modules/employees/employeesRoot'));
    router.use('/job_history', require('../modules/job_history/job_historyRoot'));
}
*/