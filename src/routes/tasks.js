const express = require('express');
const { v4 : uuid } = require('uuid');

const router = express.Router();
const db = require('../models/taskModel');

router.get('/', async (req, res) => {
  const tasks = await db.getAllTasks();

  res.render('tasks', {
    tasks: tasks
  });
});

router.post('/add', async (req, res) => {
  const task = {
    id: uuid(),
    name: req.body.name,
    completion_date: req.body.completion_date,
    status: req.body.status
  };

  await db.addTask(task);

  res.redirect('/tasks');
});

router.get('/:id', async (req, res) => {
  const task = await db.getTask(req.params.id);

  res.render('tasks/task', {
    task: task
  });
});

router.put('/:id/edit', async (req, res) => {
  const updatedTask = {
    name: req.body.name,
    completion_date: req.body.completion_date,
    status: req.body.status
  };

  await db.updateTask(req.params.id, updatedTask);

  res.redirect('/tasks');
});

router.delete('/:id', async (req, res) => {
  await db.deleteTask(req.params.id);

  res.redirect('/tasks');
});

module.exports = router;