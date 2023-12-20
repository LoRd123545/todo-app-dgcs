import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
import dateFormat from 'date-format';
const { v4 : uuid } = require('uuid');

const router = express.Router();
import db from '../models/taskModel.js';

/* render view with all tasks */
router.get('/', async (req, res) => {
  const result = await db.getAllTasks(
    req.kauth.grant.access_token.content.sub, {
      status: req.query.status
    }
  );

  //res.json(result); // for tests
  res.render('tasks', {
    tasks: result
  });
});

/* render view with form to add task */
router.get('/add', async(req, res) => {
  res.render('tasks/add');
});
/* add task */
router.post('/add', async (req, res) => {
  const task = {
    id: uuid(),
    name: req.body.name || 'unnamed',
    description: req.body.description || 'none',
    completion_date: req.body.completion_date,
    status: req.body.status,
    user_id: req.kauth.grant.access_token.content.sub
  };

  const result = await db.addTask(task);

  // res.json(result); // for tests
  res.redirect('/tasks');
});

/* render view with form to edit task */
router.get('/:id/edit', async (req, res) => {
  const result = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  res.render('tasks/edit', {
    task: result
  });
});

/* render view with single task */
router.get('/:id', async (req, res) => {
  const result = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  // res.json(result); // for tests
  res.render('tasks/task', {
    task: result
  });
});

/* update task */
router.put('/:id/edit', async (req, res) => {
  let date;
  if(req.body.completion_date === '') {
    date = dateFormat.asString('yyyy-MM-dd hh:mm:ss');
  }
  else {
    date = dateFormat.asString('yyyy-MM-dd hh:mm:ss', new Date(req.body.completion_date));
  }
  const oldTask = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );
  const newTask = {
    id: req.params.id,
    name: req.body.name || oldTask.name,
    description: req.body.description || oldTask.description,
    completion_date: date || oldTask.completion_date,
    status: req.body.status || oldTask.status,
    user_id: req.kauth.grant.access_token.content.sub
  };

  const result = await db.updateTask(newTask);

  // res.json(await db.updateTask(result)); // for tests
  res.redirect('/tasks');
});

/* delete task */
router.delete('/:id', async (req, res) => {
  const result = await db.deleteTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );
  
  //res.json(result); // for tests
  res.redirect('/tasks');
});

router.delete('/', async (req, res) => {
  res.json(await db.deleteAllTasks(
    req.kauth.grant.access_token.content.sub
  ));
});

export default router;