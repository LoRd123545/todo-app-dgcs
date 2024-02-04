import { Router } from 'express';

const router = Router();

router.get('*', async (req, res) => {
  res.json({
    message: 'Don\'t know what you\'re looking for bruh'
  });
});

export default router;