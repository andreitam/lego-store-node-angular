const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 
const databaseModule = require('../utils/database');
const database = databaseModule();

console.log('inside products')

// GET /products -> get all products
// GET /products/{id} -> get product by id
// POST /products -> post new product
router.get('/', async (req, res) => {
    const getProductsSqlQuery = `
        select * from onlinestore.product
    `
    try {
        const results =  await database.query(getProductsSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);

    const getProductByIdSqlQuery = `
        select * from onlinestore.product where theme_id = ${id}
    `
    try {
        const results =  await database.query(getProductByIdSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.post('/', (req, res) => {
    // 1. connect to db
    const {
        title,
        released_date,
        picture_url,
        imdb_link
    } = req.body;
    console.log(req.body);
    const insertMoviesSqlQuery = `insert into si.movies(title, released_date, picture_url, imdb_link)
        values('${title}', '${released_date}', '${picture_url}', '${imdb_link}')`
    connection.query(insertMoviesSqlQuery, function (err, results) {
        if (err) {
            console.error(err);
            res.json({
                success: false
            });
            return;
        }
        console.log("Result: " + results);
        res.json({
            success: true
        });
    });
});

router.post('/', async (req,res) => {
    const {
        title,
        released,
        actors
    } = req.body;
    const sqlReleased = moment(released).format("YYYY-MM-DD");
    console.log(sqlReleased);
    console.log('title', title, '\n', 'released', released, '\n', 
    'actors', actors, '\n');
    
    const insertMoviesSqlQuery = `insert into si.movies(title, released_date, picture_url, imdb_link)
        values('${title}', '${released_date}', '${picture_url}', '${imdb_link}')`
    
    try {
        const results =  await database.query(updateMoviesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }

});

module.exports = router;

