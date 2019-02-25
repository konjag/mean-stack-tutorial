const express = require('express');
const jwt = require('express-jwt');
const UserCtrl = require('../controllers/user.controller');
const config = require('../config/config');

const router = express.Router();

router.post('/signup', UserCtrl.create);
router.post('/login', UserCtrl.login);
router.get('/profile', jwt({ secret: config.JWT_SECRET }), UserCtrl.get);

module.exports = router;
