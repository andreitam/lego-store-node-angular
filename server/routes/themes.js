const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 
const databaseModule = require('../utils/database');
const database = databaseModule();
const uploadPictures = require('../utils/upload');
const upload = uploadPictures();

console.log('inside themes')

// GET /themes -> get all themes
// GET /themes/{id} -> get theme by id
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

const upFields = upload.fields([{name:'image', maxCount: 1}]);
router.post('/', upFields, async (req, res, next) => {
    //body
    const {name,description} = req.body;
    console.log('name', name, '\n', 'description', description);
    //check upload images
    const files = req.files
    console.log(req.files);
    if (!files) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    //create path
    const {image} = req.files;
    const picture_url = req.protocol + "://" + req.host + ':5000/images/' + image[0].filename;
    console.log(picture_url);   

    const insertThemeSqlQuery = `insert into onlinestore.theme(name, description, picture_url)
        values('${name}', '${description}', '${picture_url}')`
    
    try {
        const results =  await database.query(insertThemeSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }

});


module.exports = router;
