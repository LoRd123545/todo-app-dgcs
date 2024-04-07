import schedule from 'node-schedule';

import Task from '../models/task.js';
import emitter from '../events/events.js';

const tasksExpiredJobs = new Map();

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
  const date = req.body.dueDate === undefined || req.body.dueDate === "" ? new Date() : new Date(req.body.dueDate);

  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    dueDate: date,
    status: req.body.status,
    favourite: req.body.favourite,
    userID: accessToken.sub,
  });

  console.log(task.dueDate);

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
    const job = schedule.scheduleJob(task._id.toString(), dueDate, () => {
      emitter.emit('task-expired', {
        username: accessToken.preferred_username,
        taskID: task._id
      });
    });

    tasksExpiredJobs.set(task._id.toString(), job);
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

  const job = tasksExpiredJobs[req.params.id.toString()];

  // not working
  if (job !== undefined) {
    job.reschedule(req.body.dueDate);
    tasksExpiredJobs.set(req.params.id.toString(), job);
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

  const job = tasksExpiredJobs[req.params.id.toString()];
  tasksExpiredJobs.delete(tasksExpiredJobs[req.params.id.toString()]);

  if (job !== undefined) {
    job.cancel();
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

  Array.from(tasksExpiredJobs.values()).forEach((job) => {
    job.cancel();
  });

  tasksExpiredJobs.clear();
}

export default {
  find,
  add,
  findOne,
  update,
  remove,
  removeAll
};