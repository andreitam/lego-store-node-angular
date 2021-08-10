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
    console.log('route get')
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
    console.log('route get by id',id);

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

//create multer fields for destruct inside route
const upImageFields = upload.fields([{name:'image1', maxCount: 1}, 
    {name:'image2', maxCount: 1}, {name:'image3', maxCount: 1}]);

// POST /products -> insert new product    
router.post('/', upImageFields, async (req, res, next) => {
    console.log('route post')
    //body
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

router.delete('/:id', async (req,res) => {
    console.log('delete route');
    const {id} = req.params;
    console.log(id);

    const deleteProductSqlQuery = `delete from onlinestore.product
    where product_id='${id}'
    `
    try {
        const results =  await database.query(deleteProductSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }

});

router.put('/:id', upImageFields, async (req,res) => {
    const {id} = req.params;
    console.log('updating product', id);
    //body
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

    const updateProductSqlQuery = 
        `UPDATE onlinestore.product SET name = '${nameEscaped}', 
                                        price = '${price}', 
                                        discount = '${discount}', 
                                        rating = '${rating}', 
                                        age = '${age}', 
                                        piece_count = '${piece_count}', 
                                        availability = '${availability}', 
                                        description = '${descriptionEscaped}', 
                                        theme_id = '${theme_id}', 
                                        picture_url1 = '${picture_url1}', 
                                        picture_url2 = '${picture_url2}', 
                                        picture_url3 = '${picture_url3}'
                                        WHERE product_id='${id}'`
    try {
        const results =  await database.query(updateProductSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }

});

// router.put('/:id', async (req,res) => {
//     const {id} = req.params;
//     console.log('id visible', id);

//     // 1. connect to db
//     const {
//         title,
//         released,
//         actors
//     } = req.body;
//     const sqlReleased = moment(released).format("YYYY-MM-DD");
//     console.log(sqlReleased);
//     console.log('title', title, '\n', 'released', released, '\n', 
//     'actors', actors, '\n');
    
//     const updateMoviesSqlQuery = `UPDATE si.movies SET released = '${sqlReleased}', actors = '${actors}' WHERE imdbID='${id}'`;
    
//     try {
//         const results =  await database.query(updateMoviesSqlQuery);
//         console.log("Result: " + results);
//         res.json(results);
//     } catch (err){
//         console.error(err);
//     }

// });


module.exports = router;

