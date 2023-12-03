const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json('json api that allows you to get tasks - coming soon');
});

module.exports = router;