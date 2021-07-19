
const sequelize = require('../config/database')
const { Op } = require("sequelize");
const { RequiredTech, DifficultyLevel, User, Project, ProjectPicture, ProjectTech, UserLike } = require('../models/associations');
const { removeFile } = require('../utils/filesHandling')

// GET
const getProjectsCardData = async formData => {
    try {
        const wantedOrder = formData.sortby === 'likes' ? [['likesCounter', 'DESC']] : [['timestamp', 'DESC']];
        let whereClause = {
            is_visible: 1,
            name: {
                [Op.like]: `%${formData.search ? formData.search : ''}%`
            },

        };

        if (formData.difflvls) {
            whereClause.difficulty_level_id = formData.difflvls.split(',')
        }

        if (formData.assets) {
            if (formData.assets === '1') {
                whereClause.assets_src = {
                    [Op.gt]: ''
                }
            } else if (formData.assets === '0') {
                whereClause.assets_src = {
                    [Op.or]: [null, '']
                }
            }
        }

        // if (formData.reqtechs) {
        //     whereClause['$project_required_tech_id.id$'] = {
        //         [Op.in]: formData.reqtechs.split(',')
        //     }
        // }

        let reqTechWhere = {}
        if (formData.reqtechs) {
            reqTechWhere.id = formData.reqtechs.split(',')
        }

        if (formData.userId) {
            whereClause.user_id = formData.userId
        }

        const projectsCardsData = await Project.findAll(
            {
                attributes: ['id', 'name', 'assets_src', 'user_id', 'timestamp', 'likesCounter'
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
                        where: reqTechWhere, ///temp (when filtering by tech, changes the reqtech data in the card as well..)
                    },
                    {
                        model: DifficultyLevel,
                        as: 'difficulty_level',
                        attributes: ['name'],
                    },
                    {
                        model: UserLike,
                        as: 'liked_project_id',
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username'],
                    },
                ],
                order: wantedOrder,
                offset: (formData.currentpage - 1) * formData.amount,
                limit: +formData.amount
            })

        return projectsCardsData;

    } catch (err) {
        console.log(err)
    }
}

const getProjectData = async projectId => {
    try {
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
    const updatedProject = await Project.update({
        name: updatedProjectData.name,
        difficulty_level_id: updatedProjectData.difficultyLevel,
        github_url: updatedProjectData.githubLink,
        description: updatedProjectData.description,
        assets_src: updatedProjectData.assetsSrc,
    }, { where: { id: updatedProjectData.id } })

    if (updatedProjectData.pictures) {
        updatedProjectData.pictures.forEach(async projectPic => {
            await ProjectPicture.create({
                project_id: updatedProjectData.id,
                pic_src: `files/${projectPic.filename}`
            })
        })
    }

    const currentTechs = await ProjectTech.findAll({ attributes: ['tech_id'], where: { project_id: updatedProjectData.id } });
    const updatedTechs = updatedProjectData.requiredTechnologies.split(',').map(id => +id)

    //deleting all then adding updated -> if i'll have time i'll remove unneccesery and add new
    currentTechs.forEach(async projectTech => {
        const techId = projectTech.dataValues.tech_id;
        await ProjectTech.destroy({ where: { project_id: updatedProjectData.id, tech_id: techId } })
    })

    updatedTechs.forEach(async projectTech => {
        await ProjectTech.create({
            tech_id: projectTech,
            project_id: updatedProjectData.id
        })
    })
}

const hideProject = async projectId => {
    return await Project.update({
        is_visible: 0
    }, { where: { id: projectId } })
}

//POST
const addNewProject = async projectData => {
    try {
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
        projectData.requiredTechnologies.split(',').map(async techId => {
            console.log(techId)
            await ProjectTech.create({
                project_id: project.id,
                tech_id: techId
            })
        });

        if (projectData.pictures) {
            projectData.pictures.forEach(async projectPic => {
                await ProjectPicture.create({
                    project_id: project.id,
                    pic_src: `files/${projectPic.filename}`
                })
            })
        }

        return project;
    } catch (err) {
        console.log(err)
    }
}

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
    try {
        const filePath = await ProjectPicture.findByPk(picId, { attributes: ['pic_src'] });
        removeFile(filePath.dataValues.pic_src)
        return await ProjectPicture.destroy({ where: { id: picId } })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getProjectsCardData, getProjectData, updateProjectData, hideProject, addNewProject, removeReqTech, removePicture }