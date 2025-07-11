const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conselho = sequelize.define('Conselho', {
  IDCONSEPROFI: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  DESCRICAO: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  ABREVCONS: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'CONSEPROFI',
  timestamps: false,
});

module.exports = Conselho;
