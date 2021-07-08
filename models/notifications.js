const Sequelize = require('sequelize');
const db = require('../config/database')

const Notification = db.define('notifications', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  type_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'notifications_types',
      key: 'id'
    }
  },
  acted_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  notified_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  project_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    }
  },
  is_read: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  db,
  tableName: 'notifications',
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
      name: "notification_type_id_fk_idx",
      using: "BTREE",
      fields: [
        { name: "type_id" },
      ]
    },
    {
      name: "acted_user_id_idx",
      using: "BTREE",
      fields: [
        { name: "acted_user_id" },
      ]
    },
    {
      name: "notified_user_id_idx",
      using: "BTREE",
      fields: [
        { name: "notified_user_id" },
      ]
    },
    {
      name: "project_id_fk_idx",
      using: "BTREE",
      fields: [
        { name: "project_id" },
      ]
    },
  ]
});

module.exports = Notification;
