import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { schemaAutch } from "../schema/schemaautch.js";
import { prisma } from "../lib/prisma.js";

export const novoUsuario = async (req, res) => {
  const zod = schemaAutch.safeParse(req.body);
  if (!zod.success) {
    return res.status(400).json({
      erro: zod.error.issues,
    });
  }
  const { nome, email, senha, confSenha } = zod.data;
  const senhaHash = await bcrypt.hash(senha, 10);
  try {
    const novoUser = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });
    return res.status(201).json({
      sucesso: "Usuario criado com sucesso",
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        erro: "E-mail já cadastrado.",
      });
    }

    return res.status(500).json({
      erro: "Erro interno do servidor.",
    });
  }
};
