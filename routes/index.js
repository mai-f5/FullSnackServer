var express = require('express');
var router = express.Router();
const api = require('../DAL/api');

/* GET home page. */
router.get('/', async function (req, res, next) {
  // const notificationTypes = await api.getNotificationsTypesList()
  // res.send(notificationTypes)
});



module.exports = router;
