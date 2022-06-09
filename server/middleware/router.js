var express = require('express');
var router = express.Router();
const path = require('path');
const isLoggedIn = require('./isLoggedIn')

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../staticPages/loginPage/index.html'));
});

router.get('/*', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
});

module.exports = router;