const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PlanoConta = sequelize.define(
  "PlanoConta",
  {
    IDPLANOCONTA: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CODPLANO: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    TIPO: {
      type: DataTypes.ENUM("AT", "PA", "PL", "RC", "DP"),
      allowNull: false,
    },
    DESCRICAO: { type: DataTypes.STRING(250), allowNull: false },
  },
  {
    tableName: "PLANOCONTA",
    timestamps: false,
  }
);

module.exports = PlanoConta;
