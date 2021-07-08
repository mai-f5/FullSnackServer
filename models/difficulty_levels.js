const Sequelize = require('sequelize');
const db = require('../config/database')
const DifficultyLevel = db.define('difficulty_levels', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(10),
    allowNull: false
  }
}, {
  db,
  tableName: 'difficulty_levels',
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

module.exports = DifficultyLevel;
