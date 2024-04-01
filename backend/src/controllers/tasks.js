import schedule from 'node-schedule';

import Task from '../models/task.js';
import emitter from '../middleware/events.js';

const find = async (req, res, next) => {
  // data validation
  const sortBy = {
    favourite: 'desc'
  };
  sortBy[req.query.sortBy || 'dueDate'] = req.query.orderBy || 'desc';

  try {
    req.filters.userID = req.kauth.grant.access_token.content.sub;
    const tasks = await Task.find(req.filters).sort(sortBy);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'error occured while retrieving tasks'
    })
  }
}

const findOne = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'error occured while retrieving task'
    });
  }
}

const add = async (req, res, next) => {
  const accessToken = req.kauth.grant.access_token.content;

  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    favourite: req.body.favourite,
    userID: accessToken.sub,
  });

  try {
    await task.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'error occured while adding task'
    });
  }

  const dueDate = new Date(task.dueDate);
  const currentDate = new Date();

  if (currentDate.getTime() < dueDate.getTime()) {
    schedule.scheduleJob(task._id.toString(), dueDate, () => {
      emitter.emit('task-expired', {
        username: accessToken.preferred_username,
        taskID: task._id
      });
    });
  }

  res.status(201).json({
    message: 'successfully added task'
  });
}

const update = async (req, res, next) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: 'successfully updated task'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'error occured while updating task'
    });
  }
}

const remove = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
      message: 'succesfully deleted task'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'error occured while deleting task'
    });
  }
}

const removeAll = async (req, res, next) => {
  try {
    await Task.deleteMany({});
    res.json({
      message: 'successfully deleted all tasks'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'error occured while removing tasks'
    });
  }
}

export default {
  find,
  add,
  findOne,
  update,
  remove,
  removeAll
};