const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'todos'
}).promise();

module.exports = pool;