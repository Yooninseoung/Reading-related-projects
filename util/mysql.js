const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user : 'manager',
    database: 'bookManage',
    password:'1234',
    connectionLimit: 10
}).promise();


module.exports = pool;