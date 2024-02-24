import { Router } from 'express';

import keycloak from '../config/kc-config.js';

const api = () => {
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

  return router;
}

export default api;