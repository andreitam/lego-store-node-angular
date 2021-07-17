const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 
const databaseModule = require('../utils/database');
const database = databaseModule();
const uploadPictures = require('../utils/upload');
const upload = uploadPictures();

// GET /products -> get all products
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
// GET /products/{id} -> get product by id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);

    const getProductByIdSqlQuery = `
        select * from onlinestore.product where product_id = ${id}
    `
    try {
        const results =  await database.query(getProductByIdSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

// POST /products -> insert new product
const upImageFields = upload.fields([{name:'image1', maxCount: 1}, 
    {name:'image2', maxCount: 1}, {name:'image3', maxCount: 1}]);
router.post('/', upImageFields, async (req, res, next) => {
    //nody
    const {
        name,
        price,
        discount,
        rating,
        age,
        piece_count,
        availability,
        description,
        theme_id
    } = req.body;
    console.log(req.body);
    //check upload images
    const files = req.files
    console.log(req.files);
    if (!files) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    //create paths
    const {image1, image2, image3} = req.files;
    const picture_url1 = req.protocol + "://" + req.hostname + ':5000/images/' + image1[0].filename;
    const picture_url2 = req.protocol + "://" + req.hostname + ':5000/images/' + image2[0].filename;
    const picture_url3 = req.protocol + "://" + req.hostname + ':5000/images/' + image3[0].filename;
    console.log('pictures', picture_url1, picture_url2, picture_url3);
    //escape ' character for MariaDB
    const nameEscaped = name.replace(/'/g,"\\'"); 
    const descriptionEscaped = description.replace(/'/g,"\\'"); 

    console.log(descriptionEscaped); 

    const insertProductSqlQuery = `insert into onlinestore.product(name, price, discount, rating, age, 
        piece_count, availability, description, theme_id, picture_url1, picture_url2, picture_url3)
        values('${nameEscaped}', '${price}', '${discount}', '${rating}', '${age}', '${piece_count}',
        '${availability}', '${descriptionEscaped}', '${theme_id}', '${picture_url1}', '${picture_url2}', 
        '${picture_url3}')
        `

    try {
        const results =  await database.query(insertProductSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});


module.exports = router;

