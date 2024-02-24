import { Router } from 'express';

import { getFilters } from '../middleware/utils.js';
import tasks from '../controllers/tasks.js';

const api = () => {
  const router = Router();

  /* GET tasks */
  router.get('/', getFilters, tasks.find);

  /* POST tasks */
  router.post('/', tasks.add);

  /* GET tasks/:id */
  router.get('/:id', tasks.findOne);

  /* PATCH tasks/:id */
  router.patch('/:id', tasks.update);

  /* DELETE tasks/:id */
  router.delete('/:id', tasks.remove);

  /* DELETE tasks */
  router.delete('/', tasks.removeAll);

  return router;
}

export default api;