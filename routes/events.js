var express = require('express');
var router = express.Router();
const api = require('../DAL/api');

/* GET events listing */
const notifInterval = setInterval(() => {
    router.get('/notifications/:uid', async function (req, res, next) {
        const newNotifs = await api.getUsersNewNotifications(userId)
        res.send(JSON.stringify(newNotifs));
    });

}, 120000)//???????

router.get('/addfilter/search/:val', async function (req, res, next) {
    const filteredBySearch = await api.getProjectsRowData() //check about obj to remember
    res.send(JSON.stringify(filteredBySearch));
});

router.get('/addfilter/reqtech/:val', async function (req, res, next) {
    const filteredByReqTechs = await api.getProjectsRowData() //check about obj to remember
    res.send(JSON.stringify(filteredByReqTechs));
});

router.get('/addfilter/difficultylvl/:val', async function (req, res, next) {
    const filteredByDifficultyLevel = await api.getProjectsRowData() //check about obj to remember
    res.send(JSON.stringify(filteredByDifficultyLevel));
});

router.get('/addfilter/assets/:val', async function (req, res, next) {
    const filteredByAssets = await api.getProjectsRowData() //check about obj to remember
    res.send(JSON.stringify(filteredByAssets));
});

router.get('/sortby/likes', async function (req, res, next) {
    const sortedByLikes = await api.getProjectsRowData() //check about obj to remember
    res.send(JSON.stringify(sortedByLikes));
});

router.get('/sortby/timestamp', async function (req, res, next) {
    const sortedByTimestamp = await api.getProjectsRowData() //check about obj to remember
    res.send(JSON.stringify(sortedByTimestamp));
});

/* POST events listing */
router.post('/login', async function (req, res, next) {
    const isUser = await api.login(req.params.userId, req.params.password)
    res.send(JSON.stringify(isUser));
});

router.post('/signup', function (req, res, next) {
    res.send('POST SIGNUP DATA');
});

router.post('/notifications/:uid', async function (req, res, next) {
    res.send('POST NEW NOTIFICATION TO USER');
});

router.post('/like/:projectId&:userId', function (req, res, next) {
    res.send('POST NEW LIKE');
});

/* DELETE events listing */
router.delete('/dilike/:projectId&:userId', function (req, res, next) {
    res.send('REMOVE NEW LIKE');
});


module.exports = router;
