/**
 * Created by dchambi on 02/03/2017.
 */
import Example from './example.js';
var express = require('express');
var router = express.Router();
const example = new Example();
// Car brands page
router.get('/', function(req, res) {
    example.findAll(req,res);
});
router.get('/list', function(req, res) {
    example.findList(req,res);
});
router.get('/:id', function(req, res) {
    example.findId(req,res);
});
router.post('/suma', function(req, res) {
    example.suma(req,res);
});
module.exports = router;
