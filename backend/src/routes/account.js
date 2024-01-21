import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('http://host.docker.internal:8080/realms/demo/account');
});

export default router;