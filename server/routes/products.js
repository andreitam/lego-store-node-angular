const express = require('express');
const router = express.Router();
const uploadPictures = require('../middleware/upload');
const upload = uploadPictures();
const imageArray = [{name:'image1', maxCount: 1},
                    {name:'image2', maxCount: 1},
                    {name:'image3', maxCount: 1}];
const product = require('../models/productModel'); 
const authorisation = require('../middleware/authorisation');                   

// GET /products -> get all products
router.get('/', async (req, res) => {
    try {
        const results =  await product.selectAll();
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});
// GET /products/{id} -> get product by id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const results =  await product.selectById(id);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

// POST /products -> insert new product ONLY Admin  
router.post('/', authorisation.verifyToken, authorisation.verifyAdmin, 
                upload.fields(imageArray), async (req, res, next) => {
    //body
    const {name, price, discount, rating, age, piece_count, 
        availability, description, theme_id } = req.body;
    console.log(req.body);
    //check upload images
    const files = req.files
    console.log(files);
    if (!files) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);

    }
    //create paths
    const {image1, image2, image3} = req.files;
    const picture_url1 = req.protocol + "://" + req.hostname 
                        + ':5000/images/' + image1[0].filename;
    const picture_url2 = req.protocol + "://" + req.hostname 
                        + ':5000/images/' + image2[0].filename;
    const picture_url3 = req.protocol + "://" + req.hostname 
                        + ':5000/images/' + image3[0].filename;
    //escape ' character for MariaDB
    const nameEscaped = name.replace(/'/g,"\\'"); 
    const descriptionEscaped = description.replace(/'/g,"\\'"); 

    try {
        const results =  await product.insertProduct(nameEscaped, price, 
            discount, rating, age, piece_count, availability, descriptionEscaped, 
            theme_id, picture_url1, picture_url2, picture_url3);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});
//DELETE /products/:id -> delete product ONLY Admin
router.delete('/:id', authorisation.verifyToken, authorisation.verifyAdmin, 
                async (req,res) => {
    const {id} = req.params;
    try {
        const results =  await product.deleteProduct(id);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err); 
    }
});
//PUT /products/:id -> update product ONLY Admin
router.put('/:id', authorisation.verifyToken, authorisation.verifyAdmin, 
            upload.fields(imageArray), async (req,res) => {
    const {id} = req.params;
    //body
    const {name, price, discount, rating, age, piece_count, availability,
        description, theme_id } = req.body;
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
    const picture_url1 = req.protocol + "://" + req.hostname 
                        + ':5000/images/' + image1[0].filename;
    const picture_url2 = req.protocol + "://" + req.hostname 
                        + ':5000/images/' + image2[0].filename;
    const picture_url3 = req.protocol + "://" + req.hostname 
                        + ':5000/images/' + image3[0].filename;
    console.log('pictures', picture_url1, picture_url2, picture_url3);
    //escape ' character for MariaDB
    const nameEscaped = name.replace(/'/g,"\\'"); 
    const descriptionEscaped = description.replace(/'/g,"\\'"); 
    try {
        const results =  await product.updateProduct(id, nameEscaped, price, 
            discount, rating, age, piece_count, availability, descriptionEscaped, 
            theme_id, picture_url1, picture_url2, picture_url3);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

module.exports = router;

