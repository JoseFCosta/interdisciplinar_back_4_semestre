const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MovContabil = sequelize.define('MovContabil', {
  IDMOVCONTAB: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  NUMELANCAM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  DATALANCAME: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ID_ORDCOMP: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ID_ITEMVENDA: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ID_PLANOCONTA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VALDBTO: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  VALCDTO: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'MOVCONTABIL',
  timestamps: false,
});

module.exports = MovContabil;
