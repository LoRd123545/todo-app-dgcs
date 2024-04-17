import _ from 'lodash';
import Task from '../models/taskSchema.js';

async function getFilters(req, res, next) {
  const avaiableFilters = Object.keys(Task.schema.paths);
  const filters = req.query;

  req.filters = _.pickBy(filters, (value, key) => avaiableFilters.indexOf(key) > -1);
  next();
}

export {
  getFilters
};