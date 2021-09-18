const express = require('express');
const router = express.Router();
const moment = require('moment'); 

const order = require('../models/orderModel');
const orderProduct = require('../models/orderProductModel');

// GET /orders -> get all orders
router.get('/', async (req, res) => {
    try {
        const results =  await order.selectAll();
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

// GET /orders/products -> get all order-products
router.get('/products', async (req, res) => {
    try {
        const results =  await orderProduct.selectAll();
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

// cart = { items: [{product_id: , quantity: , subtotal: },{}],
//         status: ,
//         date_time: ,
//         total: ,
//         customer_id: 
// }

// POST /orders -> insert new order and order-product items from shopping cart
router.post('/', async (req, res, next) => {
    console.log(req.body);
    //body
    const {items, status, date_time, total, customer_id} = req.body;
    const sql_date_time = moment(date_time).format("YYYY-MM-DD hh:mm:ss");
    console.log(items, status, sql_date_time, total, customer_id);
    let order_id;
    //persist order
    try {
        const results =  await order.insertOrder(status, 
            sql_date_time, total, customer_id);
        console.log("Result: " + Object.entries(results));
        order_id = results.insertId;
        console.log('Order id', order_id)
        res.json(results); 
    } catch (err){
        console.error('insert order error', err);
    }
    //persist order-products
    if (order_id !== undefined) {
        items.forEach(async (item) => {
            const {product_id, quantity, subtotal} = item;
            console.log(product_id, quantity, subtotal);
            try {
                const results =  await orderProduct.insertOrderProduct(
                    quantity, subtotal, order_id, product_id);
                console.log("Result: " + Object.entries(results));
            } catch (err){
                console.error('insert order-products error',err);
            }
        });
    }
});

module.exports = router;
