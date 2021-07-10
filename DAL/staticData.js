const sequelize = require('../config/database')
const { RequiredTech, NotificationType, Gender, Occupation, DifficultyLevel } = require('../models/associations');

const getDifficultyLevelsList = async () => {
    return await DifficultyLevel.findAll();
}

const getGenderList = async () => {
    return await Gender.findAll();
}

const getOccupationsList = async () => {
    return await Occupation.findAll();
}

const getRequiredTechsList = async () => {
    return await RequiredTech.findAll();
}

const getNotificationsTypesList = async () => {
    return await NotificationType.findAll();
}

module.exports = { getDifficultyLevelsList, getGenderList, getOccupationsList, getRequiredTechsList, getNotificationsTypesList }