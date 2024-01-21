import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // res.render('index');
  res.json({
    'message': 'comming soon!'
  });
});

export default router;