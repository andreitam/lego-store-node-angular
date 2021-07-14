// call all the required packages
const express = require('express')
const multer = require('multer');
var cors = require('cors');
var fileExtension = require('file-extension');
const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ extended: true });

//CREATE EXPRESS APP
const app = express();
// cors allow usage of server from different origin only for development
app.use(cors())
//
app.use(parseUrlencoded);
app.use(express.json());

//ROUTES WILL GO HERE
const routes = require('./routes/routes.js')
app.use('/', routes);

app.listen(5000, 
    () => console.log('Server started on port 5000'));