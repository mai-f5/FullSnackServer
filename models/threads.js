const Sequelize = require('sequelize');
const db = require('../config/database')

const Thread = db.define('threads', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  project_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false
  },
  topic: {
    type: Sequelize.STRING(75),
    allowNull: false
  },
  body: {
    type: Sequelize.STRING(1000),
    allowNull: true
  }
}, {
  db,
  tableName: 'threads',
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
    {
      name: "user_id",
      using: "BTREE",
      fields: [
        { name: "user_id" },
      ]
    },
  ]
});

module.exports = Thread;