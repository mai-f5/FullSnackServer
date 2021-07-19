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
    },
    validate: {
      notNull: true,
      notEmpty: true,
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    validate: {
      notNull: true,
      notEmpty: true,
    }
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    }
  },
  topic: {
    type: Sequelize.STRING(75),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [2, 75]
    }
  },
  body: {
    type: Sequelize.STRING(1000),
    allowNull: true,
    validate: {
      len: [0, 500]
    }
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