const databaseModule = require('../utils/database');
const database = databaseModule();

selectAll = () => {
    return database.query(`SELECT * from onlinestore.theme`);
};

selectById = (id) => {
    return database.query(`SELECT * from onlinestore.theme 
                                    where theme_id = ${id}`);
};

insertTheme = (name, description, picture_url) => {
    return database.query(`INSERT into onlinestore.theme(name, description, picture_url)
    values('${name}', '${description}', '${picture_url}')`);
}; 

const theme = {
    selectById: selectById,
    selectAll: selectAll,
    insertTheme: insertTheme
};

module.exports = theme;