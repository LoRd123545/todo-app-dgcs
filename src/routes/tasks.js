const express = require('express');
const { v4 : uuid } = require('uuid');

const router = express.Router();
const db = require('../models/taskModel');

/* render view with all tasks */
router.get('/', async (req, res) => {
  const result = await db.getAllTasks();

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
    completion_date: req.body.completion_date || '2008-5-15 19:30:00',
    status: req.body.status || 'todo'
  };

  const result = await db.addTask(task);

  // res.json(result); // for tests
  res.redirect('/tasks');
});

/* render view with form to edit task */
router.get('/:id/edit', async (req, res) => {
  const result = await db.getTask(req.params.id);

  res.render('tasks/edit', {
    task: result
  });
});

/* render view with single task */
router.get('/:id', async (req, res) => {
  const result = await db.getTask(req.params.id);

  // res.json(result); // for tests
  res.render('tasks/task', {
    task: result
  });
});

/* update task */
router.put('/:id/edit', async (req, res) => {
  const oldTask = await db.getTask(req.params.id);
  const newTask = {
    id: req.params.id,
    name: req.body.name || oldTask.name,
    description: req.body.description || oldTask.description,
    completion_date: req.body.completion_date || oldTask.completion_date,
    status: req.body.status || oldTask.status
  };

  const result = await db.updateTask(newTask);

  // res.json(await db.updateTask(result)); // for tests
  res.redirect('/tasks');
});

/* delete task */
router.delete('/:id', async (req, res) => {
  const result = await db.deleteTask(req.params.id);
  
  //res.json(result); // for tests
  res.redirect('/tasks');
});

router.delete('/', async (req, res) => {
  res.json(await db.deleteAllTasks());
});

module.exports = router;