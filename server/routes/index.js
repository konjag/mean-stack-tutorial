const express = require('express');
const postRoutes = require('./post.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API works!');
});

router.use('/posts', postRoutes);

module.exports = router;
