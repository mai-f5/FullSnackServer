const sequelize = require('../config/database')
const { User, Thread, Comment } = require('../models/associations');

const getProjectsThreadsComments = async projectId => {

    try {
        return await Thread.findAll({
            where: { project_id: projectId },
            include: [
                {
                    model: Comment,
                    as: "comments",
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "username"]
                        }
                    ],
                    order: [['timestamp', 'ASC']],
                    limit: 20

                },
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username"],

                }
            ],
            order: [['timestamp', 'ASC']],
            limit: 20
        })
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