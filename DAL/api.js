var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fullsnatch2207',
    database: 'fullsnackdb',
    dateStrings: true,
    multipleStatements: true

});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


function sqlPromise(sqlQuery) {
    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
}

const api = () => {

    // MULTER EXAMPLE

    //get user
    const getUserData = userId => {
        const userRowDataQuery = `select * from users where id = ${userId}`
        return sqlPromise(userRowDataQuery)
    }

    //update user
    const updateUserData = updatedUserData => {
        const updateUserDataQuery = `update users
set ${updatedUserData.profileImg ? `profile_img = '${updatedUserData.profileImg}'` : ''}
${updatedUserData.email ? `email = ${updatedUserData.email}` : ''}
${updatedUserData.birthdate ? `birthdate = ${updatedUserData.birthdate}` : ''}
${updatedUserData.genderId ? `gender_id = ${updatedUserData.genderId}` : ''}
${updatedUserData.occupationId ? `occupation_id = ${updatedUserData.occupationId}` : ''}
where id = ${updatedUserData.userId}`
        return sqlPromise(updateUserDataQuery)
    }

    //////////////////GET REQUESTS////////////////////////////
    //-------------------Static Data-----------------------//
    const getDifficultyLevelsList = () => {
        const difficultyLevelsQuery = 'select * from difficulty_levels';
        return sqlPromise(difficultyLevelsQuery)
    }

    const getGenderList = () => {

        const genderListQuery = 'select * from gender';
        return sqlPromise(genderListQuery)

    }

    const getOccupationsList = () => {
        const occupationsListQuery = 'select * from occupations';
        return sqlPromise(occupationsListQuery)
    }

    const getRequiredTechsList = () => {
        const requiredTechsListQuery = 'select * from required_techs';
        return sqlPromise(requiredTechsListQuery)
    }

    const getNotificationsTypesList = () => {
        const notificationsTypesQuery = 'select * from notifications_types';
        return sqlPromise(notificationsTypesQuery)
    }

    //---------------------------projects cards---------------------------------//
    const getProjectsCardData = (formData) => {

        let projectsDataQuery = `select p.id, p.user_id, p.name, p.assets_src, count(ulp.liked_project_id) likesCounter, dl.name difficultyLvlName, prt.reqTechsNames
        from projects p join users_liked_projects ulp on  p.id = ulp.liked_project_id
        join difficulty_levels dl on p.difficulty_level_id = dl.id
        join(select pt.project_id, group_concat(rt.id) techs_ids, group_concat(rt.name separator ', ') reqTechsNames
				from required_techs rt join project_tech pt on pt.tech_id = rt.id
				group by pt.project_id) prt
        on prt.project_id = p.id
        where p.is_visible = 1`;

        if (!formData.pid) {
            projectsDataQuery += `
         ${formData.search !== '' ? `and p.name like '%${formData.search}%'` : ''}         
         ${formData.difflvls ? `and p.difficulty_level_id in (${formData.difflvls})` : ''}
         ${formData.reqtechs ? `and prt.techs_ids REGEXP '[${formData.reqtechs.split(',').join('')}]'` : ''}
         ${!formData.assets || (formData.assets.includes(1) && formData.assets.includes(0)) ? '' : formData.assets === '0' ? 'and p.assets_src is null' : 'and p.assets_src is not null'}         
        ${formData.user !== '' ? `and p.user_id = ${formData.user}` : ''}
         group by p.id order by ${formData.sortby === 'likes' ? 'count(ulp.liked_project_id) desc' : 'p.timestamp desc'} limit ${(formData.currentpage - 1) * formData.amount}, ${formData.amount} `;

        } else {

            projectsDataQuery += ` and p.id = ${formData.pid}`
        }
        return sqlPromise(projectsDataQuery)
    }

    // const getProjectsReqTechs = projectIdList => {
    //     const projectsReqTechsQuery = `select pt.project_id, rt.name
    //     from required_techs rt join project_tech pt on pt.tech_id = rt.id
    //     where pt.project_id in (${projectIdList}) `;
    //     return sqlPromise(projectsReqTechsQuery)
    // }

    // const getProjectsLikesCount = projectIdList => {
    //     return Promise.resolve(
    //         { project_id: 1, likesCount: 2 }
    //     )
    // }
    const getProjectsFirstPic = projectIdList => {
        const projectsFirstPicQuery = `select project_id, pic_src from projects_pictures where project_id in (${projectIdList}) group by project_id`;

        return sqlPromise(projectsFirstPicQuery)
    }


    // const getProjectsCardsPicsAndReqTech = projectIdList => {
    //     const projectsReqTechsQuery = `select pt.project_id, rt.name
    //     from required_techs rt join project_tech pt on pt.tech_id = rt.id
    //     where pt.project_id in (${projectIdList}); `;
    //     const projectsFirstPicQuery = `select project_id, pic_src from projects_pictures where project_id in (${projectIdList}) group by project_id`;

    //     return sqlPromise(projectsReqTechsQuery + projectsFirstPicQuery)
    // }

    //---------------------------specific project---------------------------------//
    const getProjectsAllPics = projectId => {
        const projectsPicsQuery = `select * from projects_pictures where project_id = ${projectId}`;
        return sqlPromise(projectsPicsQuery)
    }

    const getProjectsThreads = projectId => {
        const projectThreadsQuery = `select * from threads where project_id = ${projectId}`;
        return sqlPromise(projectThreadsQuery)
    }

    const getThreadComments = threadId => {
        const threadCommentsQuery = `select * from comments where thread_id = ${threadId}`;
        return sqlPromise(threadCommentsQuery)
    }

    const getUserUsername = userId => {
        const usernameQuery = `select username from users where user_id = ${userId}`
        return sqlPromise(usernameQuery)
    }
    //---------------------------user data---------------------------------//






    const login = (username, password) => {
        const loginDataQuery = `select * from users where username = ${username} and password = ${password} and is_active = 1`
        return sqlPromise(loginDataQuery)
        // return users.
        //     find(user => user.username === username && user.password === password)
        //query to find this username where users.username = username AND users.password = password and is_active = true// do I want to seperate them
    }

    const getDidUserLikeProject = (userId, projectId) => {
        const didUserLikeQuery = `select * from users_liked_projects where user_id = ${userId} and liked_project_id = ${projectId}`
        return sqlPromise(didUserLikeQuery)
    }

    const getUsersNewNotifications = userId => {
        const usersNewNotifsQuery = `select n.id, u.username, nt.text, n.timestamp
        from notifications n, notifications_types nt, users u
        where n.type_id = nt.id and u.id = n.acted_user_id and n.notified_user_id = ${userId} and n.is_read = 0`
        return sqlPromise(usersNewNotifsQuery)
        //query to get notification isread false
        /**
        select n.id, u.username, nt.text, n.timestamp
        from notifications n, notifications_types nt, users u
        where n.type_id = nt.id and u.id = n.acted_user_id and n.notified_user_id = 1 and n.is_read = 0
         */
    }


    //////////////////POST REQUESTS////////////////////////////

    const addNewProject = async projectData => {

        const insertProjectsRowDataQuery = `insert into projects(user_id, name, difficulty_level_id, description, assets_src,github_url,timestamp)
values(${projectData.userId}, ${projectData.name}, ${projectData.difficultyLevelId}, ${projectData.description}, ${projectData.assetsSrc},${projectData.githubUrl},${projectData.timestamp});`
        const newProjectRow = await sqlPromise(insertProjectsRowDataQuery)

        await projectData.pictures.map(pic => {
            const insertProjectsPictureQuery = `insert into projects_pictures(project_id, pic_src)
 values(${newProjectRow.id}, ${pic});`
            sqlPromise(insertProjectsPictureQuery)
        });

        await projectData.requiredTechs.map(techId => {
            const insertProjectReqTechQuery = ` insert into project_tech(tech_id, project_id)
 values(${techId},${newProjectRow.id});`
            sqlPromise(insertProjectReqTechQuery)
        });
    }

    const addNewUser = usersData => {
        const insertUserRowDataQuery = `insert into users(username, email, password)
values (${usersData.username}, ${usersData.email}, ${usersData.password});`
        return sqlPromise(insertUserRowDataQuery)
    }

    const addLike = (userId, projectId) => {
        const insertNewLikeQuery = `insert into users_liked_projects(user_id, liked_project_id)
values (${userId}, ${projectId});`
        return sqlPromise(insertNewLikeQuery)
    }

    const addNewThread = threadData => {
        const insertNewThreadQuery = ` insert into threads(project_id, user_id, timestamp, topic, body)
 values(${threadData.projectId},${threadData.userId},${threadData.timestamp}, ${threadData.topic}, ${threadData.body});`
        return sqlPromise(insertNewThreadQuery)
    }

    const addNewComment = commentData => {
        const insertNewCommentQuery = `insert into comments(user_id, thread_id, text, timestamp)
 values(${commentData.userId}, ${commentData.threadId}, ${commentData.text}, ${commentData.timestamp});`
        return sqlPromise(insertNewCommentQuery)
    }

    const addNewNotification = notificationData => {
        const insertNewNotificationQuery = `insert into notifications(type_id, acted_user_id, notified_user_id, project_id, timestamp)
values(${notificationData.typeId}, ${notificationData.actedUserId}, ${notificationData.notifiedUserId}, ${notificationData.projectId}, ${notificationData.timestamp}, )`
        return sqlPromise(insertNewNotificationQuery)
    }





    //PUT REQUESTS
    //user password
    const updateUserPassword = (userId, updatedPassword) => {
        const updatePasswordQuery = `update users
        set password = ${updatedPassword}
        where id = ${userId}`
        return sqlPromise(updatePasswordQuery)
    }
    //project row data
    const updateProjectData = updatedProjectData => {
        const updateProjectRowDataQuery = `update projects
set ${updatedProjectData.name ? `name = ${updatedProjectData.name}` : ''},
${updatedProjectData.difficultyLevelId ? `diificulty_level_id = ${updatedProjectData.difficultyLevelId}` : ''}
${updatedProjectData.description ? `description = ${updatedProjectData.description}` : ''}
${updatedProjectData.assetsSrc ? `assets_src = ${updatedProjectData.assetsSrc}` : ''}
${updatedProjectData.githubUrl ? `github_url = ${updatedProjectData.githubUrl}` : ''}
where id = ${updatedProjectData.projectId}`
        return sqlPromise(updateProjectRowDataQuery)
    }

    //notification read
    const updateNotificationsAsRead = userId => {
        const updateNotificationAsReadQuery = `update notifications
        set is_read = 1
        where is_read = 0 and notified_user_id = ${userId}`
        return sqlPromise(updateNotificationAsReadQuery)
    }

    // hide project
    const hideProject = projectId => {
        const updatedProjectVisibiltyQuery = `update projects
        set is_visible = 0
        where project_id = ${projectId}`
        return sqlPromise(updatedProjectVisibiltyQuery)
    }
    // deactivate user
    // const deactivateUser = userId => {
    //     return Promise.resolve(
    //         tempUsersTable.find(user => user.id === userId).is_active = false
    //     )
    // }


    /////////////////////////////DELETE REQUESTS///////////////////////////
    // project required tech
    const removeReqTech = (projectId, reqTechId) => {
        const deleteReqTechQuery = `delete from project_tech
        where project_id = ${projectId} and tech_id = ${reqTechId}`
        return sqlPromise(deleteReqTechQuery)
    }
    // project picture
    const removePicture = (picId) => {
        const deletePicQuery = `delete from projects_pictures
        where id = ${picId}`
        return sqlPromise(deletePicQuery)
    }
    // user like on project
    const removeLike = (userId, projectId) => {
        const deleteLikeQuery = `delete from users_liked_projects
        where user_id = ${userId} and liked_project_id = ${projectId}`
        return sqlPromise(deleteLikeQuery)
    }
    // maybe thread
    // maybe comment
    return {
        getDifficultyLevelsList, getGenderList, getOccupationsList, getRequiredTechsList, getNotificationsTypesList, getProjectsCardData, getProjectsFirstPic, getProjectsAllPics, getProjectsThreads, getThreadComments, getUserUsername, login, getDidUserLikeProject, getUsersNewNotifications, getUserData,

        addNewProject, addNewUser, addLike, addNewThread, addNewComment, addNewNotification,

        updateUserData, updateUserPassword, updateProjectData, updateNotificationsAsRead, hideProject, /*deactivateUser,*/

        removeReqTech, removePicture, removeLike
    }
}
// connection.end();
module.exports = api();