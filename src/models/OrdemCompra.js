const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrdemCompra = sequelize.define(
  "OrdemCompra",
  {
    IDORDCOMP: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    STATUSORD: {
      type: DataTypes.ENUM("PEND", "ANDA", "CONC"),
      allowNull: false,
    },
    VALOR: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    DATAPREV: { type: DataTypes.DATE, allowNull: false },
    DATAORDEM: { type: DataTypes.DATE, allowNull: false },
    DATAENTRE: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "ORDEMCOMPRA",
    timestamps: false,
  }
);

module.exports = OrdemCompra;
