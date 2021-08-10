const databaseModule = require('../utils/database');
const database = databaseModule();

selectAll = () => {
    return database.query(`SELECT * from onlinestore.product`);
};

selectById = (id) => {
    return database.query(`SELECT * from onlinestore.product 
                                    where product_id = ${id}`);
};

insertProduct = (name, price, discount, rating, age, piece_count, availability, 
    description, theme_id, picture_url1, picture_url2, picture_url3) => {
    return database.query(`INSERT into onlinestore.product(name, price, discount, rating, age, 
        piece_count, availability, description, theme_id, picture_url1, picture_url2, picture_url3)
        values('${name}', '${price}', '${discount}', '${rating}', '${age}', '${piece_count}',
        '${availability}', '${description}', '${theme_id}', '${picture_url1}', '${picture_url2}', 
        '${picture_url3}')`);
}; 

updateProduct = (id, name, price, discount, rating, age, piece_count, availability, 
    description, theme_id, picture_url1, picture_url2, picture_url3) => {
    return database.query(`UPDATE onlinestore.product SET name = '${name}', price = '${price}', 
        discount = '${discount}', rating = '${rating}', age = '${age}', piece_count = '${piece_count}', 
        availability = '${availability}', description = '${description}', theme_id = '${theme_id}', 
        picture_url1 = '${picture_url1}', picture_url2 = '${picture_url2}', picture_url3 = '${picture_url3}'
        WHERE product_id='${id}'`);
};

deleteProduct = (id) => {
    return database.query(`DELETE from onlinestore.product WHERE product_id='${id}'`)
};

const product = {
    selectById: selectById,
    selectAll: selectAll,
    insertProduct: insertProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
};

module.exports = product;