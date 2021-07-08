const Sequelize = require('sequelize');
const db = require('../config/database')

const Project = db.define('projects', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  difficulty_level_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'difficulty_levels',
      key: 'id'
    }
  },
  description: {
    type: Sequelize.STRING(200),
    allowNull: true
  },
  assets_src: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  github_url: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false
  },
  is_visible: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 1
  }
}, {
  db,
  tableName: 'projects',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "id_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "user_id",
      using: "BTREE",
      fields: [
        { name: "user_id" },
      ]
    },
    {
      name: "difficulty_level_id",
      using: "BTREE",
      fields: [
        { name: "difficulty_level_id" },
      ]
    },
  ]
});

module.exports = Project;