var express = require('express');
var router = express.Router();
const api = require('../DAL/api');
const { Project, ProjectPicture, ProjectTech, } = require('../models/associations');
/* GET projects listings. */
router.get('/:projectId', async function (req, res, next) {
    const projectPics = await api.getProjectsAllPics(req.params.pid)
    const projectThreads = await api.getProjectsThreads(req.params.pid)
    const threadsComments = await api.getThreadComments(projectThreads.map(thread => thread.id))
    res.send('VIEW PROJECT');
});

/* POST projects listings. */
router.post('/:projectid/newthread', function (req, res, next) {
    res.send('ADD THREAD');
});

router.post('/:threadid/newcomment', function (req, res, next) {
    res.send('ADD COMMENT');
});

// transfer function here - to have 1 (and not 1 in users and 1 in explore)
// router.get('/:userId/projects', function (req, res, next) {
//     const projectsData = await api.getProjectsRowData() //userId = req.params.uid
//     const projectsPics = await api.getProjectsFirstPic(projectsData.map(project => project.id))
//     const projectsLikes = await api.getProjectsLikesCount(projectsData.map(project => project.id))
//     const projectsReqTechs = await api.getProjectsReqTechs(projectsData.map(project => project.id))
//     res.send(JSON.stringify(userProjectsCards));
// });

module.exports = router;