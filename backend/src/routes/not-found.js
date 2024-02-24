import { Router } from 'express';

const api = () => {
  const router = Router();

  router.get('*', async (req, res) => {
    res.json({
      message: 'Don\'t know what you\'re looking for bruh'
    });
  });

  return router;
}


export default api;