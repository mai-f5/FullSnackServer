const Sequelize = require('sequelize');
const db = require('../config/database')

const ProjectTech = db.define('project_tech', {
  tech_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'required_techs',
      key: 'id'
    },
    validate: {
      notNull: true,
      notEmpty: true,
    }
  },
  project_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'projects',
      key: 'id'
    },
    validate: {
      notNull: true,
      notEmpty: true,
    }
  }
}, {
  db,
  tableName: 'project_tech',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "tech_id" },
        { name: "project_id" },
      ]
    },
    {
      name: "project_tech_ibfk_2_idx",
      using: "BTREE",
      fields: [
        { name: "project_id" },
      ]
    },
  ]
});

module.exports = ProjectTech;