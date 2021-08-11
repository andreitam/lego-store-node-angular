// call all the required packages
const express = require('express');

var cors = require('cors');

const bodyParser = require('body-parser');
// parse requests of content-type - application/json
const parseBody = bodyParser.json();
// OPTION parse requests of content-type - application/x-www-form-urlencoded
const parseUrlencoded = bodyParser.urlencoded({ extended: true });
const corsOptions = {
    //in case we put the client on another server
    origin: "http://localhost:4200"
  };
// set port, listen for requests
const PORT = process.env.PORT || 5000;  
const themes = require('./routes/themes.js');
const products = require('./routes/products.js');
const customers = require('./routes/customers.js');

//create app
const app = express();
// cors allow usage of server from different origin only for development
app.use(cors());
//static
app.use(express.static('public'));
//
//app.use(parseBody);
app.use(parseBody);


//routes
app.use('/themes', themes);
app.use('/products', products);
app.use('/customers', customers);


app.listen(PORT, 
    () => console.log(`Server started on port ${PORT}`));