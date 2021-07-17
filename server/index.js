// call all the required packages
const express = require('express');

var cors = require('cors');

const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ extended: true });
const themes = require('./routes/themes.js');
const products = require('./routes/products.js');

//create app
const app = express();
// cors allow usage of server from different origin only for development
app.use(cors())
//static
app.use(express.static('public'));
//
app.use(parseUrlencoded);
app.use(express.json());

//routes
app.use('/themes', themes);
app.use('/products', products);


app.listen(5000, 
    () => console.log('Server started on port 5000'));