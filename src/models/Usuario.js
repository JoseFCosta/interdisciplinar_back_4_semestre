const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    IDUSUARIO: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    LOGUSUARIO: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    SENHAUSUA: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    ID_PROFISSIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "USUARIO",
    timestamps: false,
  }
);

module.exports = Usuario;
