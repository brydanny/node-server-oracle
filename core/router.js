
var express = require('express');
var router = express.Router();
router.use('/departament', require('../modules/departament/departamentRoot'));
router.use('/employees', require('../modules/employees/employeesRoot'));
router.use('/job_history', require('../modules/job_history/job_historyRoot'));
router.use('/jobs', require('../modules/jobs/jobsRoot'));
router.use('/util',require('../modules/util/utilRoot'));
module.exports = router;

/*
module.exports = function(webServer){
    const router = webServer.getRouter();
    router.use('/departament', require('../modules/departament/departamentRoot'));
    router.use('/employees', require('../modules/employees/employeesRoot'));
    router.use('/job_history', require('../modules/job_history/job_historyRoot'));
}
*/