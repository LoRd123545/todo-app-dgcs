import express from 'express';

const api = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    res.json({
      message: 'Welcome to todo-app rest api!'
    });
  });

  return router;
}


export default api;