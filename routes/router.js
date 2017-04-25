const express = require('express');
const router = express.Router();
const home = require('./helpers/home');
const newShortUrl = require('./helpers/newShortUrl');
const redirectShortUrl = require('./helpers/redirectShortUrl');
const deleteAllShortUrl = require('./helpers/deleteAllShortUrl');

router.get('/', home);

router.get('/:shortUrl', redirectShortUrl);

router.get('/new/*', newShortUrl);

router.get('/deleteall/*', deleteAllShortUrl);

module.exports = router;