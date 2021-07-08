var express = require('express');
var router = express.Router();
const api = require('../DAL/api');


router.get('/requiredtechs', async function (req, res, next) {
    const reqTechs = await api.getRequiredTechsList()
    const valueNameObj = reqTechs.map(obj => { return { value: obj.id, label: obj.name } })
    res.send(JSON.stringify(valueNameObj));
});

router.get('/difficultylevels', async function (req, res, next) {
    const difficultyLvls = await api.getDifficultyLevelsList()
    const valueNameObj = difficultyLvls.map(obj => { return { value: obj.id, label: obj.name } })
    res.send(JSON.stringify(valueNameObj));
});

router.get('/notificationstypes', async function (req, res, next) {
    const notificationTypes = await api.getNotificationsTypesList()
    res.send(notificationTypes)
});

router.get('/gender', async function (req, res, next) {
    const genderList = await api.getGenderList();
    res.send(genderList)
});

router.get('/occupations', async function (req, res, next) {
    const occupationList = await api.getOccupationsList();
    res.send(occupationList)
});


module.exports = router;
