var express = require('express');
var router = express.Router();
const api = require('../DAL/api');

// GET
router.get('/', async function (req, res, next) {
    try {
        const projectsData = await api.getProjectsCardData(req.query)
        res.send(projectsData)

        /// PRE SEQUELIZE
        // const projectsData = await api.getProjectsCardData(req.query)
        // if (projectsData.length > 0) {
        //     const projectsFirstPic = await api.getProjectsFirstPic(projectsData.map(project => project.id))
        //     const projectsCardsData = projectsData
        //         .map(project => {
        //             return {
        //                 id: project.id,
        //                 name: project.name,
        //                 assets: project.assets_src,
        //                 difficultyLevel: project.difficultyLvlName,
        //                 requiredTechs: project.reqTechsNames,
        //                 pictures: projectsFirstPic
        //                     .filter(projectPicRow => projectPicRow.project_id === project.id)
        //                     .map(pic => pic.pic_src),
        //                 likesCounter: project.likesCounter,
        //             }
        //         })

        //     res.send(JSON.stringify(projectsCardsData));
        // }
        // else {
        //     res.send(JSON.stringify('no results found'));
        // }

    } catch (err) {
        console.log(err)
        res.status(400).send(
            { msg: 'An Error has occured' }
        )
    }
});

router.get('/:projectId', async function (req, res, next) {
    // const projectPics = await api.getProjectsAllPics(req.params.pid)
    // const projectThreads = await api.getProjectsThreads(req.params.pid)
    // const threadsComments = await api.getThreadComments(projectThreads.map(thread => thread.id))
    res.send('REST OF PROJECT DATA - will bring forum if not editing');
});

//PUT
router.put('/:projectId', function (req, res, next) {
    res.send('UPDATED PROJECT DATA');
});

router.put('/:projectId/remove', function (req, res, next) {
    res.send('HIDE PROJECT');
});


//POST

router.post('/', function (req, res, next) {
    res.send('ADD PROJECT - Data in body');
});

router.post('/:projectid/newthread', function (req, res, next) {
    res.send('ADD THREAD');
});

router.post('/:threadid/newcomment', function (req, res, next) {
    res.send('ADD COMMENT');
});

//DELETE

router.delete('/:pId/picture/:picId', function (req, res, next) {
    res.send('REMOVE IMAGE');
});

router.delete('/:userId/projects/:projectId/remove/requiredTech/:reqtechid', function (req, res, next) {
    res.send('REMOVE PROJECT\'S REQUIRED TECH ');
});

module.exports = router;