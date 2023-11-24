const express = require('express');

const router = express.Router();
const taskModel = require('../models/taskModel');

router.get('/', async (req, res) => {
  const tasks = await taskModel.getAll();

  res.render('tasks', {
    tasks: tasks
  });
  //res.send(tasks);
});

router.post('/', (req, res) => {
  const {
    name,
    completion_date,
    status
  } = req.body;

  const task = {
    name: name,
    completion_date: completion_date,
    status: status
  };

  taskModel.add(task);

  res.redirect('/tasks');
});

module.exports = router;