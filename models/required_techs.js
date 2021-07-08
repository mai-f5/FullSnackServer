const Sequelize = require('sequelize');
const db = require('../config/database')

const RequiredTechs = db.define('required_techs', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(45),
    allowNull: false
  }
}, {
  db,
  tableName: 'required_techs',
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

module.exports = RequiredTechs;