const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 
const databaseModule = require('../utils/database');
const database = databaseModule();

console.log('inside products')
router.get('/', function (req, res) {
    res.json({ message: 'Message from router: Server Started!' });
});

module.exports = router;

// GET /products -> get all products
// GET /themes -> get all themes
// GET /products/{id} -> get product by id
// GET /themes/{id} -> get theme by id
// POST /products -> post new product