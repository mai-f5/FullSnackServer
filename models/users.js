const Sequelize = require('sequelize');
const db = require('../config/database')

const User = db.define('users', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: "username_UNIQUE"
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  gender_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'gender',
      key: 'id'
    }
  },
  occupation_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'occupations',
      key: 'id'
    }
  },
  profile_img: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  is_active: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 1
  }
}, {
  db,
  createdAt: false,
  updatedAt: false,
  tableName: 'users',
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
      name: "username_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "username" },
      ]
    },
    {
      name: "email_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "email" },
      ]
    },
    {
      name: "gender_id",
      using: "BTREE",
      fields: [
        { name: "gender_id" },
      ]
    },
    {
      name: "occupation_id",
      using: "BTREE",
      fields: [
        { name: "occupation_id" },
      ]
    },
  ]
})
module.exports = User;
