import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json('json api that allows you to get tasks - coming soon');
});

export default router;