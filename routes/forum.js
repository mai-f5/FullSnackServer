var express = require('express');
var router = express.Router();
const api = require('../DAL/api');

//POST
router.post('/thread', function (req, res, next) {
    res.send('ADD THREAD TO PROJECT');
});

router.post('/comment', function (req, res, next) {
    res.send('ADD COMMENT TO THREAD');
});

module.exports = router;