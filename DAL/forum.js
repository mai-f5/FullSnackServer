const sequelize = require('../config/database')
const { User, Thread, Comment } = require('../models/associations');

const getProjectsThreadsComments = async projectId => {
    try {
        const threadsComments = await Thread.findAll({
            where: { project_id: projectId },
            include: [
                {
                    model: Comment,
                    as: "comments",
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "username", "profile_img"]
                        }
                    ],
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username", "profile_img"],

                }
            ],
            order: [
                ['timestamp', 'DESC'],
                [{ model: Comment }, 'timestamp', 'ASC']
            ],
            // limit: 20
        })

        return JSON.stringify(threadsComments);
    } catch (err) {
        console.log(err)
    }
}

const addNewThread = async threadData => {
    return await Thread.create(
        {
            ...threadData,
            timestamp: Date.now()
        }
    )
}

const addNewComment = async commentData => {
    return await Comment.create(
        {
            ...commentData,
            timestamp: Date.now()
        }
    )
}

module.exports = { getProjectsThreadsComments, addNewThread, addNewComment }