var express = require('express');
var router = express.Router();
const api = require('../DAL/projects');
const { validateCookie, cpUpload } = require('../utils/middlewares')

// GET
router.get('/', async function (req, res, next) {
    try {
        if (req.query.userId) req.query.userId = ''
        console.log(req.query)
        const projectsData = await api.getProjectsCardData(req.query)
        res.send(projectsData)
    } catch (err) {
        console.log(err, 'error')
    }
});

router.get('/dashboard', validateCookie, async function (req, res, next) {
    try {
        const projectsData = await api.getProjectsCardData(req.query)
        res.send(projectsData)
    } catch (err) {
        console.log(err, 'error')
    }
});

router.get('/:projectId', async function (req, res, next) {
    try {
        const data = await api.getProjectData(req.params.projectId)
        res.send(data);
    } catch (err) {
        console.log(err)
    }
});

//PUT
router.put('/', validateCookie, async function (req, res, next) {
    try {
        const updateProjectRes = api.updateProjectData(req.body)
        res.send(updateProjectRes)
    } catch (err) {
        console.log(err)
    }
});

router.put('/:projectId/remove', validateCookie, async function (req, res, next) {
    try {
        const removeProjectRes = await api.hideProject(req.params.projectId)
        res.send(removeProjectRes)
    } catch (err) {
        console.log(err)
    }
});


//POST
router.post('/', validateCookie, async function (req, res, next) {
    try {
        const newProjectRes = api.addNewProject(req.body)
        res.send(newProjectRes)
    } catch (err) {
        console.log(err)
    }
});

//DELETE
router.delete('/remove/requiredtech/:projectId/:techId', validateCookie, function (req, res, next) {
    try {
        const removeReqTechRes = api.removeReqTech(req.params.projectId, req.params.techId)
        res.send(removeReqTechRes)
    } catch (err) {
        console.log(err)
    }
});

router.delete('/remove/picture/:picId', validateCookie, function (req, res, next) {
    try {
        const removePictureRes = api.removePicture(req.params.picId)
        res.send(removePictureRes)
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;