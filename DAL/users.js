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
        }, { where: { id: updatedUserData.user_id } })

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
// const login = async loginData => {
//     try {
//         return await User.findOne({attributes: {exclude:['password']} where: { username: loginData.username, password: loginData.password } })
//     } catch (err) {
//         console.log(err)
//     }
// }

const login = async username => {
    try {
        return await User.findOne({ attributes: ['id', 'password'], where: { username: username } })
    } catch (err) {
        console.log(err)
    }
}

const addNewUser = async usersData => {
    try {
        return await User.create({ ...usersData })

    } catch (err) {

        console.log(err)
    }
}


module.exports = { getUserData, updateUserData, login, addNewUser, updateUserPassword }