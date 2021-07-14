const sequelize = require('../config/database')
const { User } = require('../models/associations');


//GET
const getUserData = async userId => {
    try {
        const usersData = await User.findByPk(userId, { include: ['gender', 'occupation'], plain: true })
        return usersData;
    } catch (err) {
        console.log(err)
    }
}

//PUT
const updateUserData = async updatedUserData => {
    try {
        return await User.update({
            ...updatedUserData
        }, { where: { id: updatedUserData.userId } })

    } catch (err) {
        console.log(err)
    }
}

const updateUserPassword = async updatedUserData => {
    try {
        //will validate passwords (that new ones match & old and new dont)
        let isOldPassCorrect = await User.findOne({ where: { id: updatedUserData.userId, password: updatedUserData.oldPassword } });
        if (isOldPassCorrect) {
            return await User.update({
                password: updatedUserData.newPassword
            }, { where: { id: updatedUserData.userId } })
        } else {
            throw new Error("Incorrect password")
        }
    } catch (err) {
        console.log(err)
    }
}

//POST
const login = async username => {
    try {
        return await User.findOne({ where: { username: username } })
    } catch (err) {
        console.log(err)
    }
}

const addNewUser = async usersData => {
    try {
        const newUser = await User.create({ ...usersData })
        delete newUser.dataValues['password']
        return newUser
    } catch (err) {
        console.log(err)
    }
}


module.exports = { getUserData, updateUserData, login, addNewUser, updateUserPassword }