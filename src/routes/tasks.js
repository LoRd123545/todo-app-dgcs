import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
import dateFormat from 'date-format';
import getFilters from '../middleware/utils.js';
const { v4 : uuid } = require('uuid');

const router = express.Router();
import db from '../models/taskModel.js';

/* GET tasks */
router.get('/', getFilters.getFilters, async (req, res) => {
  const sortBy = {
    column: req.query.sortBy || 'completion_date',
    value: req.query.orderBy || 'desc'
  };

  const filters = {
    query: req.filters,
    available: req.availableFilters
  };

  const user_id = req.kauth.grant.access_token.content.sub;
  const result = await db.getAllTasks(user_id, filters, sortBy);

  if(req.query.mode === 'dev') {
    res.json(result); // for tests
  }
  else {
    res.render('tasks', {
      tasks: result
    });
  }
});

/* GET tasks/add */
router.get('/add', async(req, res) => {
  res.render('tasks/add');
});

/* POST tasks/add */
router.post('/add', async (req, res) => {
  const task = {
    id: uuid(),
    name: req.body.name || 'unnamed',
    description: req.body.description || 'none',
    completion_date: req.body.completion_date || '',
    status: req.body.status || 'not-started',
    user_id: req.kauth.grant.access_token.content.sub
  };

  const result = await db.addTask(task);
  if(req.query.mode === 'dev') {
    res.json(result); // for tests
  }
  else {
    res.redirect('/tasks');
  }
});

/* GET tasks/:id/edit */
router.get('/:id/edit', async (req, res) => {
  const result = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  res.render('tasks/edit', {
    task: result
  });
});

/* GET tasks/:id */
router.get('/:id', async (req, res) => {
  const result = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  if(req.query.mode === 'dev') {
    res.json(result); // for tests
  }
  else {
    res.render('tasks/task', {
      task: result
    });
  }
});

/* PUT tasks/:id/edit */
router.put('/:id/edit', async (req, res) => {
  const oldTask = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  const newTask = {
    id: req.params.id,
    name: req.body.name || oldTask.name,
    description: req.body.description || oldTask.description,
    completion_date: req.body.completion_date || oldTask.completion_date,
    status: req.body.status || oldTask.status,
    user_id: req.kauth.grant.access_token.content.sub
  };

  const result = await db.updateTask(newTask);

  if(req.query.mode === 'dev') {
    res.json(result); // for tests
  }
  else {
    res.redirect('/tasks');
  }

});

/* DELETE tasks/:id */
router.delete('/:id', async (req, res) => {
  const result = await db.deleteTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  if(req.query.mode === 'dev') {
    res.json(result); // for tests
  }
  else {
    res.redirect('/tasks');
  }
  
});

/* DELETE tasks */
router.delete('/', async (req, res) => {
  const result = await db.deleteAllTasks(req.kauth.grant.access_token.content.sub);

  if(req.query.mode === 'dev') {
    res.json(result); // for tests
  }
  else {
    res.redirect('/tasks');
  }
});

export default router;