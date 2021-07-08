const Sequelize = require('sequelize');
const db = require('../config/database')

const Comment = db.define('comments', {
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
  thread_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'threads',
      key: 'id'
    }
  },
  text: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  db,
  tableName: 'comments',
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
      name: "user_id_fk_idx",
      using: "BTREE",
      fields: [
        { name: "user_id" },
      ]
    },
    {
      name: "thread_id_fk_idx",
      using: "BTREE",
      fields: [
        { name: "thread_id" },
      ]
    },
  ]
});

module.exports = Comment;
