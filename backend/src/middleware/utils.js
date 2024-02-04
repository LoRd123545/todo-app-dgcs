import _ from 'lodash';

import mysql from '../config/mysql-config.js';

mysql.init().catch(err => {
  console.log(err);
  process.exit(1);
});

async function getFilters(req, res, next) {
  mysql.model('tasks')
    .then(result => {
      let filters = req.query;
  
      req.filters = _.pickBy(filters, (value, key) => result.indexOf(key) > -1);
      req.availableFilters = result;
      next();
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
}

export {
  getFilters
};