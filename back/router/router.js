import express from "express";
import { atualizarEpi, criarEpi, deletarEpi, listarEPIs, listarEPI } from "../controller/EPIsC.js";
import { atualizarFuncionario, criarFuncionario, deletarFuncionario, listarFuncionario, listarFuncionarios, listarTurnos } from "../controller/FuncionariosC.js";
import { add_historico, devolver_api, listarHistorico } from "../controller/HistoricoC.js"
const router = express.Router()

router.get("/listar_epi", listarEPIs)
router.get("/listar_epi/:id", listarEPI)
router.get("/listar_func", listarFuncionarios)
router.get("/listar_func/:id", listarFuncionario)
router.get("/historico", listarHistorico)
router.get("/turnos", listarTurnos)

router.post("/add_func", criarFuncionario)
router.post("/add_epi", criarEpi)
router.post("/add_historico", add_historico)
router.post("/devolver_api", devolver_api)

router.put("/atualizar_func/:id", atualizarFuncionario)
router.put("/atualizar_epi/:id", atualizarEpi)

router.delete("/delete_func/:id", deletarFuncionario)
router.delete("/delete_epi/:id", deletarEpi)

export default router