
var express = require('express');
var router = express.Router();
router.use('/example', require('../modules/example/exampleRoot'));
module.exports = router;
