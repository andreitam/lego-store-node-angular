const databaseModule = require('../utils/database');
const database = databaseModule();

selectAll = () => {
    return database.query(`SELECT * from onlinestore.order_product`);
};

insertOrderProduct = (quantity, subtotal, order_id, product_id) => {
    return database.query(`INSERT into 
    onlinestore.order_product(quantity, subtotal, order_id, product_id)
    values('${quantity}', '${subtotal}', '${order_id}', '${product_id}')`);
}; 

const orderProduct = {
    selectAll: selectAll,
    insertOrderProduct: insertOrderProduct
};

module.exports = orderProduct;