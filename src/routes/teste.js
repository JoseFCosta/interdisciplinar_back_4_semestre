// const express = require("express");
// const router = express.Router();
// const MovContabil = require("../models2/MovContabil");
// const PlanoConta = require("../models2/PlanoConta");
// const ItemVenda = require("../models2/ItemVenda");
// const Venda = require("../models2/Venda");
// const Procedimento = require("../models2/Procedimento");
// const Especialidade = require("../models2/Especialidade");
// const Profissional = require("../models2/Profissional");
// const PessoaFis = require("../models2/PessoaFis");
// const Conselho = require("../models2/Conselho");

// // Associações
// MovContabil.belongsTo(PlanoConta, { foreignKey: "ID_PLANOCONTA" });
// MovContabil.belongsTo(ItemVenda, { foreignKey: "ID_ITEMVENDA" });

// ItemVenda.belongsTo(Venda, { foreignKey: "ID_VENDA" });
// ItemVenda.belongsTo(Procedimento, { foreignKey: "ID_PRECED" });
// ItemVenda.belongsTo(Especialidade, { foreignKey: "ID_ESPEC" });
// ItemVenda.belongsTo(Profissional, { foreignKey: "ID_PROFISSIO" });

// Venda.belongsTo(PessoaFis, {
//   foreignKey: "ID_PESSOA",
//   targetKey: "IDPESSOAFIS",
// });
// Profissional.belongsTo(PessoaFis, { foreignKey: "ID_PESSOAFIS" });
// Profissional.belongsTo(Conselho, { foreignKey: "ID_CONSEPROFI" });

// router.get("/", async (req, res) => {
//   try {
//     const movs = await MovContabil.findAll({
//       include: [
//         { model: PlanoConta },
//         {
//           model: ItemVenda,
//           include: [
//             {
//               model: Venda,
//               include: [
//                 {
//                   model: PessoaFis,
//                   attributes: ["NOMEPESSOA", "CPFPESSOA"],
//                 },
//               ],
//             },
//             {
//               model: Procedimento,
//               attributes: ["CODPROCED", "DESCRPROC"],
//             },
//             {
//               model: Especialidade,
//               attributes: ["DESCESPEC"],
//             },
//             {
//               model: Profissional,
//               include: [
//                 {
//                   model: PessoaFis,
//                   attributes: ["NOMEPESSOA", "CPFPESSOA"],
//                 },
//                 {
//                   model: Conselho,
//                   attributes: ["ABREVCONS"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     const response = movs.map((mov) => {
//       const venda = mov.ItemVenda?.Venda;
//       const cliente = venda?.PessoaFi;
//       const item = mov.ItemVenda;

//       return {
//         idVenda: venda?.IDVENDA || null,
//         dataPag: venda?.DATAPAG || null,
//         valorVenda: parseFloat(venda?.VALORVENDA || 0),
//         formaPagamento: venda?.FORMPAG === "1" ? "À vista" : "Parcelado",
//         cliente: {
//           nome: cliente?.NOMEPESSOA || "",
//           cpf: cliente?.CPFPESSOA || "",
//         },
//         itens: [
//           {
//             procedimento: {
//               codigo: item?.Procedimento?.CODPROCED || "",
//               descricao: item?.Procedimento?.DESCRPROC || "",
//             },
//             profissional: {
//               nome: item?.Profissional?.PessoaFi?.NOMEPESSOA || "",
//               especialidade: item?.Especialidade?.DESCESPEC || "",
//               conselho: item?.Profissional?.Conselho?.ABREVCONS || "",
//             },
//           },
//         ],
//       };
//     });

//     console.log(JSON.stringify(movs, null, 2)); // <-- ADICIONE ISSO AQUI

//     return res.json(response);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erro no servidor" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const MovContabil = require("../models2/MovContabil");
const PlanoConta = require("../models2/PlanoConta");
const ItemVenda = require("../models2/ItemVenda");
const Venda = require("../models2/Venda");
const Procedimento = require("../models2/Procedimento");
const Especialidade = require("../models2/Especialidade");
const Profissional = require("../models2/Profissional");
const PessoaFis = require("../models2/PessoaFis");
const Conselho = require("../models2/Conselho");

MovContabil.belongsTo(PlanoConta, { foreignKey: "ID_PLANOCONTA" });
MovContabil.belongsTo(ItemVenda, { foreignKey: "ID_ITEMVENDA" });

ItemVenda.belongsTo(Venda, { foreignKey: "ID_VENDA" });
ItemVenda.belongsTo(Procedimento, { foreignKey: "ID_PRECED" });
ItemVenda.belongsTo(Especialidade, { foreignKey: "ID_ESPEC" });
ItemVenda.belongsTo(Profissional, { foreignKey: "ID_PROFISSIO" });

Venda.belongsTo(PessoaFis, { foreignKey: "ID_PESSOA", targetKey: "ID_PESSOA" });
Profissional.belongsTo(PessoaFis, { foreignKey: "ID_PESSOAFIS" });
Profissional.belongsTo(Conselho, { foreignKey: "ID_CONSEPROFI" });

router.get("/", async (req, res) => {
  try {
    const movs = await MovContabil.findAll({
      where: {
        ID_ITEMVENDA: { [Op.not]: null },
      },
      include: [
        { model: PlanoConta },
        {
          model: ItemVenda,
          include: [
            {
              model: Venda,
              include: [
                {
                  model: PessoaFis,
                  attributes: ["NOMEPESSOA", "CPFPESSOA"],
                },
              ],
            },
            {
              model: Procedimento,
              attributes: ["CODPROCED", "DESCRPROC"],
            },
            {
              model: Especialidade,
              attributes: ["DESCESPEC"],
            },
            {
              model: Profissional,
              include: [
                {
                  model: PessoaFis,
                  attributes: ["NOMEPESSOA", "CPFPESSOA"],
                },
                {
                  model: Conselho,
                  attributes: ["ABREVCONS"],
                },
              ],
            },
          ],
        },
      ],
    });

    const response = movs.map((mov) => {
      const item = mov.ItemVenda;
      const venda = item?.Venda;
      const cliente = venda?.PessoaFi;

      return {
        idMovimentacao: mov.IDMOVCONTAB,
        numeroLancamento: mov.NUMELANCAM,
        dataLancamento: mov.DATALANCAME,
        planoConta: {
          codigo: mov.PlanoContum?.CODPLANO || null,
          tipo: mov.PlanoContum?.TIPO || null,
          descricao: mov.PlanoContum?.DESCRICAO || null,
        },
        idVenda: venda?.IDVENDA || null,
        dataPag: venda?.DATAPAG || null,
        valorVenda: parseFloat(venda?.VALORVENDA || 0),
        formaPagamento: venda?.FORMPAG === "1" ? "À vista" : "Parcelado",
        cliente: {
          nome: cliente?.NOMEPESSOA || "",
          cpf: cliente?.CPFPESSOA || "",
        },
        itens: [
          {
            procedimento: {
              codigo: item?.Procedimento?.CODPROCED || "",
              descricao: item?.Procedimento?.DESCRPROC || "",
            },
            profissional: {
              nome: item?.Profissional?.PessoaFi?.NOMEPESSOA || "",
              especialidade: item?.Especialidade?.DESCESPEC || "",
              conselho: item?.Profissional?.Conselho?.ABREVCONS || "",
            },
          },
        ],
      };
    });

    res.json(response);
  } catch (err) {
    console.error("Erro detalhado:", err);
    res.status(500).json({ err: "Erro ao buscar movimentações" });
  }
});

module.exports = router;
