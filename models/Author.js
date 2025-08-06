const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.js');

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'authors',
  timestamps: false,
});

module.exports = Author;