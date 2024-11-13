import express from "express";
import { atualizarEpi, criarEpi, deletarEpi, listarEPIs } from "../controller/EPIsC.js";
import { atualizarFuncionario, criarFuncionario, deletarFuncionario, listarFuncionarios } from "../controller/FuncionariosC.js";
import { listarHistorico } from "../controller/HistoricoC.js"
const router = express.Router()

router.get("/listar_epi", listarEPIs)
router.get("/listar_func", listarFuncionarios)
router.get("/historico", listarHistorico)

router.post("/add_func", criarFuncionario)
router.post("/add_epi", criarEpi)

router.put("/atualizar_func/:id", atualizarFuncionario)
router.put("/atualizar_epi/:id", atualizarEpi)

router.delete("/delete_func/:id", deletarFuncionario)
router.delete("/delete_epi/:id", deletarEpi)

export default router