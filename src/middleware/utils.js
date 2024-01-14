import mysql from '../config/mysql-config.js';
import qs from 'qs';
import _ from 'lodash';

mysql.init().catch(err => {
  console.log(err);
  process.exit(1);
});

async function getFilters(req, res, next) {
  const sql = `SHOW COLUMNS FROM tasks`;

  mysql.execute(sql, [], (err, rows) => {
    let availableFilters = [];
    let filters = qs.parse(req.query);

    rows.forEach(elem => {
      availableFilters.push(Object.values(elem)[0]);
    });

    req.filters = _.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1);
    req.availableFilters = availableFilters;
    next();
  });
}

export default {
  getFilters
};