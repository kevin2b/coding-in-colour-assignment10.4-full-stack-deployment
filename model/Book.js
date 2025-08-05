const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Author = require('./Author.js');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
}, {
  tableName: 'books',
  timestamps: false,
});

Author.hasMany(Book);
Book.belongsTo(Author, {
  foreignKey: 'author_id',
});

module.exports = Book;