const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'todos',
  charset: 'utf8mb4'
}).promise();

module.exports = pool;