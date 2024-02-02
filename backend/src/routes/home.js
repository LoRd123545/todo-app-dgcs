import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
    message: 'Welcome to todo-app rest api!'
  });
});

export default router;