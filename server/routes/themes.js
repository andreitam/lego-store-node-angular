const express = require('express');
const router = express.Router();
const uploadPictures = require('../middleware/upload');
const upload = uploadPictures();
const imageArray = [{name:'image', maxCount: 1}];
const theme = require('../models/themeModel');

// GET /themes -> get all themes
router.get('/', async (req, res) => {
    try {
        const results =  await theme.selectAll();
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});
// GET /themes/{id} -> get theme by id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const results =  await theme.selectById(id);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
}); 
// POST /themes -> insert new theme 
router.post('/', upload.fields(imageArray), async (req, res, next) => {
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
    const picture_url = req.protocol + "://" + req.hostname 
                        + ':5000/images/' + image[0].filename; 
    //escape ' character for MariaDB
    const nameEscaped = name.replace(/'/g,"\\'");
    const descriptionEscaped = description.replace("'", "\\'").replace("’", "\\'");
    try {
        const results =  await theme.insertTheme(nameEscaped, 
            descriptionEscaped, picture_url);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }

});

module.exports = router;
