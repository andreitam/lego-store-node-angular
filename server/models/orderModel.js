const databaseModule = require('../utils/database');
const database = databaseModule();

selectAll = () => {
    return database.query(`SELECT * from onlinestore.order`);
};

insertOrder = (status, date_time, total, customer_id) => {
    return database.query(`INSERT into onlinestore.order
    (status, date_time, total, customer_id)
    values('${status}', '${date_time}', '${total}', '${customer_id}')`);
}; 

const order = {
    selectAll: selectAll,
    insertOrder: insertOrder
};

module.exports = order;
