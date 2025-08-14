const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.js');
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

Author.hasMany(Book, {
  foreignKey: 'author_id',
  onDelete: 'RESTRICT',
});
Book.belongsTo(Author, {
  foreignKey: {
    name: 'author_id',
    allowNull: false,
  },
  onDelete: 'RESTRICT',
});

module.exports = Book;