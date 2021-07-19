const Sequelize = require('sequelize');
const db = require('../config/database')

const ProjectPicture = db.define('projects_pictures', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  project_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
    references: {
      model: 'projects',
      key: 'id'
    }
  },
  pic_src: {
    type: Sequelize.STRING(255),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    }
  },
}, {
  db,
  tableName: 'projects_pictures',
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
      name: "project_id",
      using: "BTREE",
      fields: [
        { name: "project_id" },
      ]
    },
  ]
});

module.exports = ProjectPicture;
