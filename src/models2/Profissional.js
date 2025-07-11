const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profissional = sequelize.define('Profissional', {
  IDPROFISSIO: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ID_PESSOAFIS: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ID_CONSEPROFI: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'PROFISSIONAL',
  timestamps: false,
});

module.exports = Profissional;
