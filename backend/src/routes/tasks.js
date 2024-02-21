import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import schedule from 'node-schedule';

import { getFilters } from '../middleware/utils.js';
import db from '../models/task.js';

import emitter from '../middleware/events.js';
const router = Router();

/* GET tasks */
router.get('/', getFilters, async (req, res) => {
  const sortBy = {
    column: req.query.sortBy || 'completion_date',
    value: req.query.orderBy || 'desc'
  };
  const filters = {
    availableFilters: req.availableFilters,
    query: req.filters
  }
  const userID = req.kauth.grant.access_token.content.sub;

  db.getAllTasks(userID, filters, sortBy)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

/* POST tasks */
router.post('/', async (req, res) => {
  const task = {
    id: uuid(),
    name: req.body.name || 'unnamed',
    description: req.body.description || 'none',
    completion_date: req.body.completion_date || '',
    status: req.body.status || 'not-started',
    userID: req.kauth.grant.access_token.content.sub
  };

  const dueDate = new Date(task.completion_date);
  const currentDate = new Date();

  if(currentDate.getTime() < dueDate.getTime()) {
    schedule.scheduleJob(task.id.toString(), dueDate, () => {
      emitter.emit('task-expired', {
        userID: task.userID,
        taskID: task.id
      });
    });
  }

  db.addTask(task)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

/* GET tasks/:id */
router.get('/:id', async (req, res) => {
  const result = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

/* PUT tasks/:id */
router.put('/:id', async (req, res) => {
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
    userID: req.kauth.grant.access_token.content.sub
  };

  db.updateTask(newTask)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

/* DELETE tasks/:id */
router.delete('/:id', async (req, res) => {
  const result = await db.deleteTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

/* DELETE tasks */
router.delete('/', async (req, res) => {
  db.deleteAllTasks(req.kauth.grant.access_token.content.sub)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default router;