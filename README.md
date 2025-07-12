# Backend – Sistema de Movimentações Contábeis  
Node.js · Express · Sequelize · MySQL

> API REST hospedada no servidor da faculdade, conectada ao banco MySQL via SSH tunnel.  
> Todas as credenciais estão protegidas no arquivo `.env`.  
> As rotas estão disponíveis em: `http://160.20.22.99:5280/`

## Índice

- [Visão Geral](#visão-geral)
- [Stack e Pré-Requisitos](#stack-e-pré-requisitos)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Instalação e Execução](#instalação-e-execução)
- [Modelos do Banco](#modelos-do-banco)
- [Rotas da API](#rotas-da-api)
- [Exemplos de Uso](#exemplos-de-uso)
- [Contribuição e Licença](#contribuição-e-licença)

---

## Visão Geral

Este backend oferece:

- CRUD de Movimentações Contábeis, Itens de Venda, Ordens de Compra e Planos de Contas
- Autenticação via login
- Conexão ao banco da faculdade via SSH tunnel
- Deploy com PM2

---

## Stack e Pré-Requisitos

| Camada           | Tecnologia   |
|------------------|--------------|
| Linguagem        | Node.js      |
| Framework        | Express      |
| ORM              | Sequelize    |
| Banco de Dados   | MySQL        |
| Gerenciador PM2  | pm2          |

---

## Estrutura de Pastas

```
backend/
├── index.js
├── .env
└── src/
    ├── config/
    │   └── database.js
    ├── models/
    │   ├── ItemVenda.js
    │   ├── MovContabil.js
    │   ├── OrdemCompra.js
    │   ├── PlanoConta.js
    │   ├── Profissional.js
    │   └── Usuario.js
    └── routes/
        ├── itemvenda.js
        ├── login.js
        ├── movContabil.js
        ├── ordemcompra.js
        └── planoconta.js
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` com as variáveis abaixo:

```
PORT=5280
DB_HOST=srvdb-dev
DB_PORT=3306
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASS=senha
```

---

## Instalação e Execução

### Clone o projeto:

```
git clone git@github.com:seu-usuario/seu-repo.git
cd seu-repo/backend
```

### Instale as dependências:

```
npm install
```

### Estabeleça o túnel SSH com o banco:

```
ssh -N -L 3306:srvdb-dev:3306 usuario@verticaltecnologia.net.br -p 47979
```

### Rode o servidor:

```
npm start
```

### Ou com PM2 (produção):

```
pm2 start index.js --name backend-contabil
pm2 save
```

---

## Modelos do Banco

| Modelo        | Tabela        | Campos principais                          |
|---------------|---------------|--------------------------------------------|
| MovContabil   | MOVCONTABIL   | NUMELANCAM, ID_ITEMVENDA, VALDBTO, VALCDTO |
| ItemVenda     | ITEMVENDA     | IDITEMVENDA, ID_VENDA, ID_PROFISSIO        |
| OrdemCompra   | ORDEMCOMPRA   | STATUSORD, VALOR, DATAORDEM                |
| PlanoConta    | PLANOCONTA    | CODPLANO, TIPO, DESCRICAO                  |
| Usuario       | USUARIO       | LOGUSUARIO, SENHAUSUA                      |
| Profissional  | PROFISSIONAL  | STATUSPROFI, TIPOPROFI                     |

---

## Rotas da API

**Base URL:** `http://160.20.22.99:5280`

### `/login`

| Método | Rota     | Descrição                       |
|--------|----------|----------------------------------|
| POST   | /login   | Autentica usuário                |

---

### `/movimentacoes`

| Método | Rota               | Descrição                        |
|--------|--------------------|----------------------------------|
| GET    | /movimentacoes     | Lista todas as movimentações     |
| POST   | /movimentacoes     | Cria nova movimentação contábil  |

---

### `/itemvenda`

| Método | Rota               | Descrição                    |
|--------|--------------------|------------------------------|
| GET    | /itemvenda         | Lista todos os itens de venda |
| GET    | /itemvenda/:id     | Retorna item de venda por ID  |

---

### `/ordemcompra`

| Método | Rota                 | Descrição                     |
|--------|----------------------|-------------------------------|
| GET    | /ordemcompra         | Lista todas as ordens         |
| GET    | /ordemcompra/:id     | Retorna ordem por ID          |
| POST   | /ordemcompra         | Cria nova ordem de compra     |

---

### `/planoconta`

| Método | Rota                | Descrição                      |
|--------|---------------------|--------------------------------|
| GET    | /planoconta         | Lista todos os planos de conta |
| GET    | /planoconta/:id     | Retorna plano de conta por ID  |

---

## Exemplos de Uso

### Login

```bash
curl -X POST http://160.20.22.99:5280/login   -H "Content-Type: application/json"   -d '{"LOGUSUARIO": "admin@fasipe.com", "SENHAUSUA": "senhaAdm"}'
```

### Criar movimentação contábil

```bash
curl -X POST http://160.20.22.99:5280/movimentacoes   -H "Content-Type: application/json"   -d '{
    "NUMELANCAM": 45,
    "DATALANCAME": "2025-07-01",
    "ID_PLANOCONTA": 3,
    "VALDBTO": 100.00,
    "VALCDTO": 0.00
  }'
```

---

## Contribuição e Licença

1. Fork o projeto  
2. Crie uma branch: `git checkout -b feature/minha-feature`  
3. Commit suas alterações: `git commit -m 'feat: nova funcionalidade'`  
4. Push: `git push origin feature/minha-feature`  
5. Crie um Pull Request

Distribuído sob a licença MIT.
