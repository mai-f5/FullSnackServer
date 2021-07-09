const Comment = require("./comments");
const DifficultyLevel = require("./difficulty_levels");
const Gender = require("./gender");
const Notification = require("./notifications");
const NotificationType = require("./notifications_types");
const Occupation = require("./occupations");
const ProjectTech = require("./project_tech");
const Project = require("./projects");
const ProjectPicture = require("./projects_pictures");
const RequiredTech = require("./required_techs");
const Thread = require("./threads");
const User = require("./users");
const UserLike = require("./users_liked_projects");


NotificationType.hasMany(Notification, { as: "notifications", foreignKey: "type_id" });
Gender.hasMany(User, { as: "users", foreignKey: "gender_id" });
Occupation.hasMany(User, { as: "users", foreignKey: "occupation_id" });
DifficultyLevel.hasMany(Project, { as: "projects", foreignKey: "difficulty_level_id" });
RequiredTech.hasMany(ProjectTech, { as: "project_teches", foreignKey: "tech_id" });

User.belongsTo(Gender, { as: "gender", foreignKey: "gender_id" });
User.belongsTo(Occupation, { as: "occupation", foreignKey: "occupation_id" });
User.hasMany(Project, { as: "projects", foreignKey: "user_id" });
User.hasMany(Comment, { as: "comments", foreignKey: "user_id" });
User.hasMany(Thread, { as: "threads", foreignKey: "user_id" });
User.hasMany(UserLike, { as: "users_id_liked_projects", foreignKey: "user_id" });
User.hasMany(Notification, { as: "notified_user_notifications", foreignKey: "notified_user_id" });
User.hasMany(Notification, { as: "notifications", foreignKey: "acted_user_id" });
User.belongsToMany(Project, { as: 'liked_project_id_projects', through: UserLike, foreignKey: "user_id", otherKey: "liked_project_id" });

UserLike.belongsTo(User, { as: "user", foreignKey: "user_id" });
UserLike.belongsTo(Project, { as: "liked_project", foreignKey: "liked_project_id" });

Project.belongsTo(User, { as: "user", foreignKey: "user_id" });
Project.belongsTo(DifficultyLevel, { as: "difficulty_level", foreignKey: "difficulty_level_id" });
Project.hasMany(Notification, { as: "notifications", foreignKey: "project_id" });
Project.hasMany(ProjectTech, { as: "project_techs", foreignKey: "project_id" });
Project.hasMany(ProjectPicture, { as: "projects_pictures", foreignKey: "project_id" });
Project.hasMany(UserLike, { as: "liked_project_id", foreignKey: "liked_project_id" });
Project.hasMany(Thread, { as: "threads", foreignKey: "project_id" });
Project.belongsToMany(RequiredTech, { as: 'project_required_tech_id', through: ProjectTech, foreignKey: "project_id", otherKey: "tech_id" });
Project.belongsToMany(User, { as: 'liked_user_id', through: UserLike, foreignKey: "liked_project_id", otherKey: "user_id" });

ProjectPicture.belongsTo(Project, { as: "project", foreignKey: "project_id" });

ProjectTech.belongsTo(Project, { as: "project", foreignKey: "project_id" });
ProjectTech.belongsTo(RequiredTech, { as: "tech", foreignKey: "tech_id" });

RequiredTech.belongsToMany(Project, { as: 'project_id_projects', through: ProjectTech, foreignKey: "tech_id", otherKey: "project_id" });

Thread.hasMany(Comment, { as: "comments", foreignKey: "thread_id" });
Thread.belongsTo(Project, { as: "project", foreignKey: "project_id" });
Thread.belongsTo(User, { as: "user", foreignKey: "user_id" });

Comment.belongsTo(Thread, { as: "thread", foreignKey: "thread_id" });
Comment.belongsTo(User, { as: "user", foreignKey: "user_id" });

Notification.belongsTo(NotificationType, { as: "type", foreignKey: "type_id" });
Notification.belongsTo(Project, { as: "project", foreignKey: "project_id" });
Notification.belongsTo(User, { as: "acted_user", foreignKey: "acted_user_id" });
Notification.belongsTo(User, { as: "notified_user", foreignKey: "notified_user_id" });


module.exports = { RequiredTech, NotificationType, Gender, Occupation, DifficultyLevel, User, Project, Thread, Comment, Notification, ProjectPicture, ProjectTech, UserLike }
