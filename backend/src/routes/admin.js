import { Router } from 'express';
import keycloak from '../config/kc-config.js';

import { getFilters } from '../middleware/utils.js';
import db from '../models/task.js';

const kcAdminClient = keycloak.init();

const router = Router();

router.get('/users', async (req, res) => {
  const users = await kcAdminClient.users.find({});

  res.json(users);
});

router.get('/users/:id', async (req, res) => {
  const user = await kcAdminClient.users.findOne({
    id: req.params.id
  });

  res.json(user);
});

router.get('/users/:id/tasks', getFilters, async (req, res) => {
  const sortBy = {
    column: req.query.sortBy || 'completion_date',
    value: req.query.orderBy || 'desc'
  };

  const filters = {
    query: req.filters,
    available: req.availableFilters
  };

  const tasks = await db.getAllTasks(
    req.params.id,
    filters,
    sortBy
  );

  res.json(tasks);
});

export default router;