const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Profissional = sequelize.define(
  "Profissional",
  {
    IDPROFISSIO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    STATUSPROFI: {
      type: DataTypes.STRING(1), // se for texto, senão use INTEGER
      allowNull: false,
    },
    TIPOPROFI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_CONSEPROFI: {
      type: DataTypes.INTEGER,
      allowNull: true, // pode ser null
    },
  },
  {
    tableName: "PROFISSIONAL",
    timestamps: false,
  }
);

module.exports = Profissional;
