
// without sequalize

/* 

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_complete',
    password: 'MySql@1234',
});

module.exports = pool.promise(); 

*/

// with sequalize

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'MySql@1234', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
