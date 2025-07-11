const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Especialidade = sequelize.define(
  "Especialidade",
  {
    IDESPEC: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DESCESPEC: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "ESPECIALIDADE",
    timestamps: false,
  }
);

module.exports = Especialidade;
