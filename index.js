require("dotenv").config();
const express = require("express");
const sequelize = require("./src/config/database");

const movimentacoes = require("./src/routes/movContabil");
const itemvenda = require("./src/routes/itemvenda");
const ordemcompra = require("./src/routes/ordemcompra");
const planoconta = require("./src/routes/planoconta");
const login = require("./src/routes/login");
const teste = require("./src/routes/teste");

const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/movimentacoes", movimentacoes);
app.use("/itemvenda", itemvenda);
app.use("/ordemcompra", ordemcompra);
app.use("/planoconta", planoconta);
app.use("/login", login);
app.use("/teste", teste);

const PORT = process.env.PORT;

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida.");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
