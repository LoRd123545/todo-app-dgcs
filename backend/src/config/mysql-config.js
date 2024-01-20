import mysql from 'mysql2';

const {
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_DATABASE: DATABASE,
  MYSQL_PASSWORD: PASSWORD
} = process.env;

let pool;

async function init() {
  const host = HOST;
  const user = USER;
  const db = DATABASE;
  const pass = PASSWORD;

  pool = mysql.createPool({
    host: host,
    user: user,
    password: pass,
    database: db,
    charset: 'utf8mb4',
    dateStrings: true
  });

  return new Promise((acc, rej) => {
    pool.execute(`
      CREATE TABLE
      IF NOT EXISTS
      tasks
      (id varchar(36) primary key, name varchar(50), description varchar(500),
      completion_date datetime, status varchar(20), user_id varchar(36))
    `, err => {
      if(err) {
        return rej(err);
      }

      const message = `Connected to mysql db at host ${HOST}`;
      acc(message);
    });
  });
}

async function teardown() {
  return new Promise((acc, rej) => {
    pool.end(err => {
      if(err) {
        return rej(err);
      }

      acc();
    });
  });
}

async function execute(dbQuery, params, callback) {
  return new Promise((acc, rej) => {
    pool.execute(dbQuery, [...params], callback);
  });
}

export default {
  init,
  teardown,
  execute
};