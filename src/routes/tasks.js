const express = require('express');

const router = express.Router();
const taskModel = require('../models/taskModel');

router.get('/', async (req, res) => {
  const tasks = await taskModel.getAll();

  res.render('tasks', {
    tasks: tasks
  });
});

router.post('/add', (req, res) => {
  const task = {
    name: req.body.name,
    completion_date: req.body.completion_date,
    status: req.body.status
  };

  taskModel.add(task);

  res.redirect('/tasks');
});

router.get('/:id', (req, res) => {

});

router.put('/:id/edit', (req, res) => {

});

router.delete('/:id', (req, res) => {
  taskModel.delete(req.params.id);
  res.redirect('/tasks');
});

module.exports = router;