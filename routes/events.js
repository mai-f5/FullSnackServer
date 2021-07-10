var express = require('express');
var router = express.Router();
const api = require('../DAL/events');

// NOTIFICATIONS

//GET
router.get('/notifications/:userId', async function (req, res, next) {
    try {
        const newNotifs = await api.getUsersNewNotifications(req.params.userId)
        res.send(JSON.stringify(newNotifs));
    } catch (err) {
        console.log(err)
    }
});

//PUT
router.put('/notifications/:userId', async function (req, res, next) {
    const updateNotifs = await api.updateNotificationsAsRead(req.params.userId)
    res.send(JSON.stringify(updateNotifs));
});

//POST
router.post('/notifications', async function (req, res, next) {
    try {
        const newNotifRes = await api.addNewNotification(req.body)
        res.send(newNotifRes)

    } catch (err) {
        console.log(err)
    }
});



//LIKES

//GET
router.get('/likes/:userId/:projectId', async function (req, res, next) {
    try {
        const didUserLike = await api.getDidUserLikeProject(req.params.userId, req.params.projectId)
        res.send(JSON.stringify(didUserLike))
    } catch (err) {
        console.log(err)
    }
});

//POST
router.post('/likes', async function (req, res, next) {
    try {
        const addLikeRes = await api.addNewLike(req.body)
        res.send(JSON.stringify(addLikeRes))
    } catch (err) {
        console.log(err)
    }
});

//DELETE
router.delete('/likes/:userId/:projectId', async function (req, res, next) {
    try {
        const removeLikeRes = await api.removeLike(req.params.userId, req.params.projectId)
        res.send(JSON.stringify(removeLikeRes))
    } catch (err) {
        console.log(err)
    }
});


module.exports = router;
