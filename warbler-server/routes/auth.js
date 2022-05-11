const express = require('express');
const router = express.Router();

const { signup, signin } = require('../handlers/auth');

// run auth handler on any signup
router.post('/signup', signup);
// run auth handler on signin
router.post('/signin', signin);

module.exports = router;