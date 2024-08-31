const { 
    RequiredTech, 
    NotificationType, 
    Gender, 
    Occupation, 
    DifficultyLevel, 
    User, 
    Project, 
    Thread, 
    Comment, 
    Notification, 
    ProjectPicture, 
    ProjectTech, 
    UserLike
 } = require('../models/associations');

async function syncDatabase() {
    try {
        await RequiredTech.sync();
        await NotificationType.sync();
        await Gender.sync();
        await Occupation.sync();
        await DifficultyLevel.sync();
        await User.sync();
        await Project.sync();
        await Thread.sync();
        await Comment.sync();
        await Notification.sync();
        await ProjectPicture.sync();
        await ProjectTech.sync();
        await UserLike.sync();
        
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
}

module.exports = { syncDatabase };