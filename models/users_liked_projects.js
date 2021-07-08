const Sequelize = require('sequelize');
const db = require('../config/database')


const UserLike = db.define('users_liked_projects', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  liked_project_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'projects',
      key: 'id'
    }
  }
}, {
  db,
  tableName: 'users_liked_projects',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "user_id" },
        { name: "liked_project_id" },
      ]
    },
    {
      name: "projectidfk_idx",
      using: "BTREE",
      fields: [
        { name: "liked_project_id" },
      ]
    },
  ]
});

module.exports = UserLike;