const { Sequelize } = require('sequelize');
const db = new Sequelize('fullsnackdb', 'root', 'Fullsnatch2207', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.authenticate()
    .then(() => console.log('connected'))
    .catch(err => console.log(err));


module.exports = db;