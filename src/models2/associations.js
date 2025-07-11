// associations.js
const MovContabil = require("./MovContabil");
const PlanoConta = require("./PlanoConta");
const ItemVenda = require("./ItemVenda");
const Venda = require("./Venda");
const Procedimento = require("./Procedimento");
const Especialidade = require("./Especialidade");
const Profissional = require("./Profissional");
const PessoaFis = require("./PessoaFis");
const Conselho = require("./Conselho");

// Associações
MovContabil.belongsTo(PlanoConta, { foreignKey: "ID_PLANOCONTA" });
MovContabil.belongsTo(ItemVenda, { foreignKey: "ID_ITEMVENDA" });

ItemVenda.belongsTo(Venda, { foreignKey: "ID_VENDA" });
Venda.belongsTo(PessoaFis, { foreignKey: "ID_PESSOA" });

ItemVenda.belongsTo(Procedimento, { foreignKey: "ID_PRECED" });
ItemVenda.belongsTo(Especialidade, { foreignKey: "ID_ESPEC" });
ItemVenda.belongsTo(Profissional, { foreignKey: "ID_PROFISSIO" });

Profissional.belongsTo(PessoaFis, { foreignKey: "ID_PESSOAFIS" });
Profissional.belongsTo(Conselho, { foreignKey: "ID_CONSEPROFI" });
