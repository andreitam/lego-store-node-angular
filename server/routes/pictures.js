const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 
const databaseModule = require('../utils/database');
const database = databaseModule();
const uploadPictures = require('../utils/upload');
const upload = uploadPictures();


console.log('inside pictures')
router.get('/', function (req, res) {
    res.json({ message: 'Message from pictures: Server Started!' });
});
// POST /pictures/uploadfiles -> insert into picture table product pictures
const upFields = upload.fields([{name:'image1', maxCount: 1}, 
                                {name:'image2', maxCount: 1}, 
                                {name:'image3', maxCount: 1}, 
                                {name:'image4', maxCount: 1}, 
                                {name:'image5', maxCount: 1}]);
router.post('/uploadfiles', upFields, (req, res, next) => {
    const files = req.files
    console.log(req.files);
    const {image1, image2} = req.files;
    console.log(image1[0].path)
    console.log(images)
    if (!files) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})















module.exports = router;