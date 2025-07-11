const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PessoaFis = sequelize.define('PessoaFis', {
  IDPESSOAFIS: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ID_PESSOA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CPFPESSOA: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  NOMEPESSOA: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  tableName: 'PESSOAFIS',
  timestamps: false,
});

module.exports = PessoaFis;
