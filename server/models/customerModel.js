const databaseModule = require('../utils/database');
const database = databaseModule();

selectById = (id) => {
    return database.query(`select * from onlinestore.customer 
                                    where customer_id = ${id}`);
};

selectByName = (name) => {
    return database.query(`select * from onlinestore.customer 
                                    where name = '${name}'`);
};

selectByEmail = (email) => {
    return database.query(`select * from onlinestore.customer 
                                    where email = '${email}'`);
};

selectAll = () => {
    return database.query(`select * from onlinestore.customer`);
};

insertCustomer = (name, email, adress, password) => {
    return database.query(`insert into onlinestore.customer(name, email, adress, rights, password)
                    values('${name}', '${email}', '${adress}', '1', '${password}')`);
};

selectRightsById = (id) => {
    return database.query(`select rights from onlinestore.customer 
                                    where customer_id = ${id}`);
}

const customer = {
    selectById: selectById,
    selectByName: selectByName,
    selectByEmail: selectByEmail,
    selectAll: selectAll,
    insertCustomer: insertCustomer,
    selectRightsById: selectRightsById
};

module.exports = customer;