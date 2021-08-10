const express = require('express');
const router = express.Router();
const customer = require('../models/customerModel');
const authentication = require('../middleware/authentication');
const authorisation = require('../middleware/authorisation');

// GET /customers -> get all customers ONLY Admin
router.get('/', authorisation.verifyToken, authorisation.verifyAdmin, 
                async (req,res) => {
                    try {
                        const results =  await customer.selectAll();
                        console.log("Result: " + results);
                        res.json(results);
                    } catch (err){
                        console.error(err);
                    }
                });


// GET /customers/{id} -> get customer by id ONLY Admin
router.get('/:id', authorisation.verifyToken, authorisation.verifyAdmin,
                async (req,res) => {
                    const {id} = req.params;
                    try {
                        const results =  await customer.selectById(id);
                        console.log("Result: " + results);
                        res.json(results);
                    } catch (err){
                        console.error(err);
                    }
});

// POST /customers/auth/signup -> signup new customer
router.post('/auth/signup', authentication.signUp);

// POST /customers/auth/signin -> signin customer
router.post('/auth/signin', authentication.signIn);


module.exports = router;
