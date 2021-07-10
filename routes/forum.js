var express = require('express');
var router = express.Router();
const api = require('../DAL/forum');

//GET
router.get('/:projectId', async function (req, res, next) {
    try {
        const projectsThreadsComments = await api.getProjectsThreadsComments(req.params.projectId)
        res.send(projectsThreadsComments)
    } catch (err) {
        console.log(err)
    }
});


//POST
router.post('/thread', async function (req, res, next) {
    try {
        const addedThreadRes = await api.addNewThread(req.body)
        res.send(addedThreadRes)
    } catch (err) {
        console.log(err)
    }

});

router.post('/comment', async function (req, res, next) {
    try {
        const addedCommentRes = await api.addNewComment(req.body)
        res.send(addedCommentRes)
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;