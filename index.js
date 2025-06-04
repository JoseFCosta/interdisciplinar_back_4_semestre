const express = require('express');
const sequelize = require('./src/config/database');
const movContabilRoutes = require('./src/routes/movContabil');

const app = express();
app.use(express.json());
app.use('/movimentacoes', movContabilRoutes);

const PORT = 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida.');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
