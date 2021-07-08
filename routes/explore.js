var express = require('express');
var router = express.Router();
const api = require('../DAL/api');
/* GET explore page listing. */



router.get('/', async function (req, res, next) {
    try {
        const projectsData = await api.getProjectsCardData(req.query)
        if (projectsData.length > 0) {
            const projectsFirstPic = await api.getProjectsFirstPic(projectsData.map(project => project.id))
            const projectsCardsData = projectsData
                .map(project => {
                    return {
                        id: project.id,
                        name: project.name,
                        assets: project.assets_src,
                        difficultyLevel: project.difficultyLvlName,
                        requiredTechs: project.reqTechsNames,
                        pictures: projectsFirstPic
                            .filter(projectPicRow => projectPicRow.project_id === project.id)
                            .map(pic => pic.pic_src),
                        likesCounter: project.likesCounter,
                    }
                })

            res.send(JSON.stringify(projectsCardsData));
        }
        else {
            res.send(JSON.stringify('no results found'));
        }
    } catch (err) {
        console.log(err)
    }
});



// router.get('/search=:keywords&reqtechs=:reqTechsIds&difflvls=:difficultyLvlsIds&assets=:assetsIds&sortby=:sortBy&amount=:amount&currentPage=:currPage&user=:userId', async function (req, res, next) {
//     const projectsData = await api.getProjectsRowData(req.params)
// })

module.exports = router;
