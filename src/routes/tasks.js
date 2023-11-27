const express = require('express');
const { v4 : uuid } = require('uuid');

const router = express.Router();
const db = require('../models/taskModel');

/* render view with all tasks */
router.get('/', async (req, res) => {
  const tasks = await db.getAllTasks();

  res.render('tasks', {
    tasks: tasks
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
    name: req.body.name,
    description: req.body.description,
    completion_date: req.body.completion_date,
    status: req.body.status
  };

  await db.addTask(task);

  res.redirect('/tasks');
});

/* render view with form to edit task */
router.get('/:id/edit', async (req, res) => {
  const task = await db.getTask(req.params.id);

  res.render('tasks/edit', {
    task: task
  });
});

/* render view with single task */
router.get('/:id', async (req, res) => {
  const task = await db.getTask(req.params.id);

  res.render('tasks/task', {
    task: task
  });
});

/* update task */
router.put('/:id/edit', async (req, res) => {
  const oldTask = await db.getTask(req.params.id);

  const updatedTask = {
    name: req.body.name || oldTask.name,
    description: req.body.description || oldTask.description,
    completion_date: req.body.completion_date || oldTask.completion_date,
    status: req.body.status || oldTask.status
  };

  await db.updateTask(req.params.id, updatedTask);

  res.redirect('/tasks');
});

/* delete task */
router.delete('/:id', async (req, res) => {
  await db.deleteTask(req.params.id);

  res.redirect('/tasks');
});

module.exports = router;