const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Usuario = require("../models/Usuario");
const Profissional = require("../models/Profissional");

router.post("/", async (req, res) => {
  const { LOGUSUARIO, SENHAUSUA } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { LOGUSUARIO } });

    if (!usuario) {
      return res.status(400).json({
        code: "USER_NOT_FOUND",
        message: "Usuário ou senha inválidos.",
      });
    }

    // 2. Verificar a senha (bcrypt ou direta)
    let senhaCorreta = false;

    if (
      usuario.SENHAUSUA.startsWith("$2b$") ||
      usuario.SENHAUSUA.startsWith("$2a$")
    ) {
      senhaCorreta = await bcrypt.compare(SENHAUSUA, usuario.SENHAUSUA);
    } else {
      senhaCorreta = SENHAUSUA === usuario.SENHAUSUA;
    }

    if (!senhaCorreta) {
      return res.status(400).json({
        code: "INVALID_PASSWORD",
        message: "Usuário ou senha inválidos.",
      });
    }

    // 3. Verificar se o profissional existe e está ativo
    const profissional = await Profissional.findOne({
      where: { IDPROFISSIO: usuario.ID_PROFISSIO },
    });

    // 5. Verificar se os campos foram preenchidos corretamente
    if (!profissional) {
      return res.status(400).json({
        code: "NOT_PROFESSIONAL",
        message: "Usuário não é profissional.",
      });
    }

    // Verificar se o profissional está ativo
    if (profissional.STATUSPROFI !== "1") {
      return res.status(400).json({
        code: "PROFESSIONAL_INACTIVE",
        message: "Profissional inativo.",
      });
    }

    // Verificar se tipo é permitido OU se ID_CONSEPROFI é 70
    const tipo = parseInt(profissional.TIPOPROFI, 10);
    const conse = parseInt(profissional.ID_CONSEPROFI, 10);

    if (tipo < 2 && conse !== 70) {
      return res.status(403).json({
        code: "PROFESSIONAL_UNAUTHORIZED",
        message:
          "Este tipo de profissional não está autorizado a acessar o sistema.",
      });
    }

    if (!LOGUSUARIO || !SENHAUSUA) {
      return res.status(400).json({
        code: "MISSING_FIELDS",
        message: "Login e senha são obrigatórios.",
      });
    }

    // 4. Sucesso
    return res.status(200).json({
      code: "LOGIN_SUCCESS",
      message: "Login bem-sucedido.",
      usuario: {
        id: usuario.IDUSUARIO,
        login: usuario.LOGUSUARIO,
        idProfissional: usuario.ID_PROFISSIO,
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({
      code: "SERVER_ERROR",
      message: "Erro interno no servidor.",
      error: err.message,
    });
  }
});

module.exports = router;
