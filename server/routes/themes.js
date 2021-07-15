const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 
const databaseModule = require('../utils/database');
const database = databaseModule();

console.log('inside themes')

router.get('/', async (req, res) => {
    const getThemesSqlQuery = `
        select * from onlinestore.theme
    `
    try {
        const results =  await database.query(getThemesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);

    const getThemesByIdSqlQuery = `
        select * from onlinestore.theme where theme_id = ${id}
    `
    try {
        const results =  await database.query(getThemesByIdSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});


module.exports = router;

// GET /products -> get all products
// GET /themes -> get all themes
// GET /products/{id} -> get product by id
// GET /themes/{id} -> get theme by id
// POST /products -> post new product