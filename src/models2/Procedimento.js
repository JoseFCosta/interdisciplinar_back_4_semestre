const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Procedimento = sequelize.define(
  "Procedimento",
  {
    IDPROCED: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CODPROCED: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    DESCRPROC: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    VALORPROC: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "PROCEDIMENTO",
    timestamps: false,
  }
);

module.exports = Procedimento;
