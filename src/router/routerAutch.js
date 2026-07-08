import { Router } from "express";
import { novoUsuario } from "../controller/autch.js";

const router = Router()

router.post('/', novoUsuario)

export default router