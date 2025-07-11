const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venda = sequelize.define(
  "Venda",
  {
    IDVENDA: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_PESSOA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    VALORVENDA: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    DATAPAG: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    FORMPAG: {
      type: DataTypes.ENUM("1", "2"),
      allowNull: false,
    },
  },
  {
    tableName: "VENDA",
    timestamps: false,
  }
);

module.exports = Venda;
