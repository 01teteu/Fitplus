import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { schemaAutch } from "../schema/schemaautch.js";
import { schemaLogin } from "../schema/schemaautch.js";
import { prisma } from "../lib/prisma.js";
dotenv.config()
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
export const loginUsuario = async (req, res) => {
  const { id } = req.params;
  const zod = schemaLogin.safeParse(req.body);
  if (!zod.success) {
    return res.status(400).json({
      erro: zod.error.issues,
    });
  }
  try {
    const userDb = await prisma.user.findFirst({ where: { id } });

    if (!userDb) {
      return res.status(404).json({
        erro: "Usuario inválido.",
      });
    }
    const { email, senha } = zod.data;
    const comparehash = await bcrypt.compare(senha, userDb.senha);
    if (!comparehash) {
      return res.status(400).json({
        erro: "Senha inválida",
      });
    }
    if (email !== userDb.email) {
      return res.status(400).json({
        erro: "Email inválido",
      });
    }
    const token = jwt.sign(
      { id: userDb.id, email: userDb.email, nome: userDb.nome },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      mensagem: "Usuario logado com sucesso ",
      tokenUsuario: {
        token,
      },
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      erro: 'Erro do lado do servidor.'
    })
  }
};
