const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ItemVenda = sequelize.define(
  "ItemVenda",
  {
    IDITEMVENDA: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_VENDA: { type: DataTypes.INTEGER, allowNull: false },
    QTDITEM: { type: DataTypes.INTEGER, allowNull: false },
    ID_ESPEC: { type: DataTypes.INTEGER, allowNull: true },
    ID_PRECED: { type: DataTypes.CHAR(5), allowNull: false },
    ID_PROFISSIO: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "ITEMVENDA",
    timestamps: false,
  }
);

module.exports = ItemVenda;
