const sequelize = require('../config/database')
const { User } = require('../models/associations');


//GET
const getUserData = async userId => {
    try {
        const usersData = await User.findByPk(userId, { include: ['gender', 'occupation'] })
        delete usersData.dataValues['password']
        return usersData;
    } catch (err) {
        console.log(err)
    }
}

const getUserPassword = async userId => {
    try {
        const userPassword = await User.findByPk(userId, { attributes: ['password'] })
        return userPassword
    } catch (err) {
        console.log(err)
    }
}
//PUT
const updateUserData = async updatedUserData => {
    try {
        return await User.update({
            ...updatedUserData,
            gender_id: updatedUserData.gender,
            occupation_id: updatedUserData.occupation === 'Select occupation' ? null : updatedUserData.occupation,
        }, { where: { id: updatedUserData.userId } })

    } catch (err) {
        console.log(err)
    }
}

const updateUserPassword = async updatedUserData => {
    try {
        return await User.update({
            password: updatedUserData.newPassword
        }, { where: { id: updatedUserData.userId } })
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


module.exports = { getUserData, getUserPassword, updateUserData, login, addNewUser, updateUserPassword }