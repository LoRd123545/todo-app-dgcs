import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { getFilters } from '../middleware/utils.js';
import db from '../models/taskModel.js';

const router = Router();

/* GET tasks */
router.get('/', getFilters, async (req, res) => {
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

  res.json(result);
});

/* POST tasks/ */
router.post('/', async (req, res) => {
  const task = {
    id: uuid(),
    name: req.body.name || 'unnamed',
    description: req.body.description || 'none',
    completion_date: req.body.completion_date || '',
    status: req.body.status || 'not-started',
    user_id: req.kauth.grant.access_token.content.sub
  };

  const result = await db.addTask(task);

  res.json(result);
});

/* GET tasks/:id */
router.get('/:id', async (req, res) => {
  const result = await db.getTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  res.json(result);
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

  res.json(result);
});

/* DELETE tasks/:id */
router.delete('/:id', async (req, res) => {
  const result = await db.deleteTask(
    req.params.id,
    req.kauth.grant.access_token.content.sub
  );

  res.json(result);
});

/* DELETE tasks */
router.delete('/', async (req, res) => {
  const result = await db.deleteAllTasks(req.kauth.grant.access_token.content.sub);

  res.json(result);
});

export default router;