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
router.post('/', function(req, res) {
    example.add(req,res);
});
router.get('/list', function(req, res) {
    example.findList(req,res);
});
router.get('/:id', function(req, res) {
    example.findId(req,res);
});
router.put('/:id', function(req, res) {
    example.update(req,res);
});
router.delete('/:id', function(req, res) {
    example.delete(req,res);
});
module.exports = router;