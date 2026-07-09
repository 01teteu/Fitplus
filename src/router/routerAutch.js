import { Router } from "express";
import { novoUsuario, loginUsuario } from "../controller/autch.js";

const router = Router();

router.post("/", novoUsuario);
router.post('/login/:id', loginUsuario)

export default router;
