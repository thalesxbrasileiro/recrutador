const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresaController");

// Rotas para Empresas
router.post("/", empresaController.criarEmpresa);
router.get("/", empresaController.obterEmpresas);
router.get("/:id", empresaController.obterEmpresaPorId);
router.put("/:id", empresaController.atualizarEmpresa);
router.delete("/:id", empresaController.deletarEmpresa);

// Rotas para Candidatos
router.post("/:empresaId/candidatos", empresaController.adicionarCandidato);
router.get("/:empresaId/candidatos/status", empresaController.obterCandidatosPorStatus);

router.get("/:empresaId/candidatos/:candidatoId", empresaController.obterCandidatoPorId); 
router.put("/:empresaId/candidatos/:candidatoId", empresaController.atualizarCandidato);
router.delete("/:empresaId/candidatos/:candidatoId", empresaController.deletarCandidato); 

module.exports = router;
