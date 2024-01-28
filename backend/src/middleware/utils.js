import qs from 'qs';
import _ from 'lodash';

import mysql from '../config/mysql-config.js';

mysql.init().catch(err => {
  console.log(err);
  process.exit(1);
});

async function getFilters(req, res, next) {
  mysql.model('tasks')
    .then(result => {
      let availableFilters = [];
      let filters = qs.parse(req.query);
  
      result.forEach(elem => {
        availableFilters.push(Object.values(elem)[0]);
      });
  
      req.filters = _.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1);
      req.availableFilters = availableFilters;
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