const sequelize = require('../config/database')
const { NotificationType, User, Project, Notification, UserLike } = require('../models/associations');

//NOTIFICATIONS

//GET
const getUsersNewNotifications = async userId => {
    return await Notification.findAll({
        where: { notified_user_id: userId, is_read: 0 },
        include: [
            {
                model: NotificationType,
                as: "type",
                attributes: ['text']
            },
            {
                model: User,
                as: "acted_user",
                attributes: ['username']
            },
            {
                model: Project,
                as: "project",
                attributes: ['id']
            }
        ]

    })
}

//PUT
const updateNotificationsAsRead = async userId => {
    return await Notification.update({
        is_read: 1
    },
        { where: { notified_user_id: userId, is_read: 0 } }
    )
}

//POST
const addNewNotification = async notificationData => {
    return await Notification.create({
        ...notificationData,
        timestamp: JSON.stringify(Date.now())
    })
}


//LIKES
//GET
const getDidUserLikeProject = async (userId, projectId) => {
    return await UserLike.findOne({ where: { user_id: userId, liked_project_id: projectId } }) ? true : false
}

//POST
const addNewLike = async likeData => {
    return await UserLike.create({ ...likeData })
}


//DELETE
const removeLike = async (userId, projectId) => {
    return await UserLike.destroy({ where: { user_id: userId, liked_project_id: projectId } })
}


module.exports = {
    getUsersNewNotifications, updateNotificationsAsRead, addNewNotification,
    getDidUserLikeProject, addNewLike, removeLike
}