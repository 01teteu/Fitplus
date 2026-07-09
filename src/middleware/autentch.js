import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const autenticar = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ erro: "Token não fornecido ou formato inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const validartoken = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioLogado = validartoken;
    next();
  } catch (error) {
    return res.status(403).json({
      erro: "Token inválido ou expirado",
    });
  }
};
