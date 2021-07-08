const Sequelize = require('sequelize');
const db = require('../config/database')
const NotificationType = db.define('notifications_types', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  text: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
}, {
  db,
  tableName: 'notifications_types',
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
  ]
});

module.exports = NotificationType;