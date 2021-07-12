const sequelize = require('../config/database')
const { RequiredTech, DifficultyLevel, User, Project, ProjectPicture, ProjectTech, UserLike } = require('../models/associations');


// GET
const getProjectsCardData = async formData => {
    try {
        let whereClause = {};
        // let wantedOrder = req.query.sortby === 'likes' ? [[sequelize.col('likesCounter'), 'DESC']] : ['timestamp', 'DESC'];

        if (formData.search) {
            whereClause.name = { [Op.like]: `%${formData.search}%` }
        }
        if (formData.difflvls) {
            whereClause.difficulty_level_id = formData.difflvls.split(',')
        }
        // if (req.query.reqtechs) {
        //     whereClause['$project_required_tech_id.tech_id$'] = req.query.reqtechs.split(',')
        // }
        if (formData.user) {
            whereClause.user_id = formData.userId
        }

        const projectsCardsData = await Project.findAll(
            {
                attributes: ['id', 'name', 'assets_src', 'user_id', 'timestamp',
                ],
                where: whereClause,
                include: [
                    {
                        model: ProjectPicture,
                        as: 'projects_pictures',
                        attributes: ['pic_src'],
                        limit: 1
                    },
                    {
                        model: RequiredTech,
                        as: 'project_required_tech_id',
                        attributes: ['id', 'name'],

                    },

                    {
                        model: DifficultyLevel,
                        as: 'difficulty_level',
                        attributes: ['name']
                    },
                    {
                        model: UserLike,
                        as: 'liked_project_id',
                    }
                ],
                // order: [[sequelize.fn('COUNT', sequelize.col('liked_project_id')), 'liked_project_id'], 'DESC'],
                offset: 0, limit: 20
                // offset: (req.query.currentpage - 1) * req.query.amount,
                // limit: req.query.amount
            })
        console.log('hi')
        console.log(projectsCardsData)
        return projectsCardsData;
    } catch (err) {
        console.log(err)
    }
}

const getProjectData = async projectId => {
    try {
        //check if already have?
        //if not:
        const projectData = await Project.findByPk(projectId, {
            where: { is_visible: 1 },
            include: [
                {
                    model: ProjectPicture,
                    as: 'projects_pictures',
                    attributes: ['id', 'pic_src'],
                },
                {
                    model: RequiredTech,
                    as: 'project_required_tech_id',
                    attributes: ['id', 'name'],

                },
                {
                    model: DifficultyLevel,
                    as: 'difficulty_level',
                    attributes: ['name']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username']
                },
                {
                    model: UserLike,
                    as: 'liked_project_id',
                    // attributes: [
                    //     [sequelize.fn('COUNT', sequelize.col('liked_project_id')), 'count']
                    // ]
                }

            ]
        })
        return projectData;
    } catch (err) {
        console.log(err)
    }
}

// PUT
const updateProjectData = async updatedProjectData => {
    return await Project.update({
        ...updatedProjectData.rowData
    }, { where: { id: updatedProjectData.projectId } })
    //update multiple table at once?
}

const hideProject = async projectId => {
    return await Project.update({
        is_visible: 0
    }, { where: { id: projectId } })
}

//POST
const addNewProject = async projectData => {
    //validations
    // adding to multiple tables (projects, projects pictures & projects techs)
    const project = await Project.create({
        user_id: projectData.userId,
        name: projectData.name,
        difficulty_level_id: projectData.difficultyLevel,
        github_link: projectData.github_link,
        description: projectData.description,
        assets_src: projectData.assetsSrc,
        timestamp: Date.now()
    })

    projectData.requiredTechs.map(async techId => {
        await ProjectTech.create({
            project_id: project.id,
            tech_id: techId.techId
        })
    });
    projectData.pictures.map(async pic => {
        await ProjectPicture.create({
            project_id: project.id,
            pic_src: pic.picSrc
        })
    })
    return project.id
    // .then(projectId => {
    //     console.log(projectId)
    //     projectData.requiredTechs.map(techId => {
    //         console.log(techId)
    //         ProjectTech.create({
    //             project_id: projectId,
    //             tech_id: techId.techId
    //         })
    //     })
    //     projectData.pictures.map(pic => {
    //         console.log(pic)
    //         ProjectPicture.create({
    //             project_id: projectId,
    //             pic_src: pic.picSrc
    //         })
    //     })
    // })
}

// {
//  "name"   :"postit app",
//  "difficultyLevl": "1",
//  "requiredTechs":[
//      {"techId":"1"},
//      {"techId":"2"}
//  ],
//  "githubLink":"",
//  "description":"",
//  "pictures":[
//      {
//          "picSrc":"lala.png"
//      }
//  ],
//  "asstesSrc":"lala.rar"
// }

//DELETE
const removeReqTech = async (projectId, reqTechId) => {
    try {
        return await ProjectTech.destroy({ where: { project_id: projectId, tech_id: reqTechId } })
    } catch (err) {
        console.log(err)
    }
}
// project picture
const removePicture = async picId => {
    return await ProjectPicture.destroy({ where: { id: picId } })
}

module.exports = { getProjectsCardData, getProjectData, updateProjectData, hideProject, addNewProject, removeReqTech, removePicture }