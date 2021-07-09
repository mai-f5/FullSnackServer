var express = require('express');
var router = express.Router();
const api = require('../DAL/api');

// NOTIFICATIONS
//GET

router.get('/notifications/:uid', async function (req, res, next) {
    const newNotifs = await api.getUsersNewNotifications(userId)
    res.send(JSON.stringify(newNotifs));
});

//PUT
router.put('/notifications/:uid', async function (req, res, next) {
    const updateNotifs = await api.updateNotificationsAsRead(userId)
    res.send(JSON.stringify(updateNotifs));
});

//POST
router.post('/notifications/:uid', async function (req, res, next) {
    res.send('POST NEW NOTIFICATION TO USER');
});



//LIKES
//GET
router.get('/likes/:uid/:pid', async function (req, res, next) {
    res.send('DID USER LIKE PROJECT')
});

//POST
router.post('/likes/:uid/:pid', function (req, res, next) {
    res.send('USER LIKED PROJECT');
});

//DELETE
router.post('/likes/:uid/:pid', function (req, res, next) {
    res.send('REMOVE USERS PROJECT LIKE');
});


module.exports = router;
