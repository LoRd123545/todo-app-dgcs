import { Router } from 'express';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import dotenv from 'dotenv';

import { getFilters } from '../middleware/utils.js';
import db from '../models/task.js';

dotenv.config({
  path: '../.env'
});

const {
  KEYCLOAK_BASE_URL: KEYCLOAK_BASE_URL,
  KEYCLOAK_REALM: KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_USER: KEYCLOAK_CLIENT_USER,
  KEYCLOAK_CLIENT_USER_PASSWORD: KEYCLOAK_CLIENT_USER_PASSWORD,
  KEYCLOAK_GRANT_TYPE: KEYCLOAK_GRANT_TYPE,
  KEYCLOAK_CLIENT: KEYCLOAK_CLIENT,
  KEYCLOAK_CLIENT_SECRET: KEYCLOAK_CLIENT_SECRET
} = process.env;

const kcAdminClient = new KcAdminClient({
  baseUrl: KEYCLOAK_BASE_URL,
  realmName: KEYCLOAK_REALM
});

kcAdminClient.auth({
  username: KEYCLOAK_CLIENT_USER,
  password: KEYCLOAK_CLIENT_USER_PASSWORD,
  grantType: KEYCLOAK_GRANT_TYPE,
  clientId: KEYCLOAK_CLIENT,
  clientSecret: KEYCLOAK_CLIENT_SECRET
});

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