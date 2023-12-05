import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'todos',
  charset: 'utf8mb4',
  dateStrings: true
}).promise();


pool.query(`
  CREATE TABLE
  IF NOT EXISTS
  tasks
  (id varchar(36) primary key, name varchar(50), description varchar(500),
  completion_date datetime, status varchar(20), user_id varchar(36))
`);

export default pool;