const { Empresa, empresas } = require("../models/empresa");
const Candidato = require("../models/candidato");

let empresaIdCounter = 1;
let candidatoIdCounter = 1;

const criarEmpresa = (req, res) => {
    const { nome } = req.body;
    const novaEmpresa = new Empresa(empresaIdCounter++, nome);
    empresas.push(novaEmpresa);
    res.status(201).json(novaEmpresa);
};

const obterEmpresas = (req, res) => {
    res.json(empresas);
};

const obterEmpresaPorId = (req, res) => {
    const empresa = empresas.find(e => e.id === parseInt(req.params.id));
    empresa ? res.json(empresa) : res.status(404).json({ error: "Empresa não encontrada" });
};

const atualizarEmpresa = (req, res) => {
    const empresa = empresas.find(e => e.id === parseInt(req.params.id));
    if (empresa) {
        empresa.nome = req.body.nome || empresa.nome;
        res.json(empresa);
    } else {
        res.status(404).json({ error: "Empresa não encontrada" });
    }
};

const deletarEmpresa = (req, res) => {
    const index = empresas.findIndex(e => e.id === parseInt(req.params.id));
    if (index !== -1) {
        empresas.splice(index, 1);
        res.json({ message: "Empresa removida" });
    } else {
        res.status(404).json({ error: "Empresa não encontrada" });
    }
};

const adicionarCandidato = (req, res) => {
    const { empresaId } = req.params;
    const empresa = empresas.find(e => e.id === parseInt(empresaId));

    if (!empresa) {
        return res.status(404).json({ error: "Empresa não encontrada" });
    }

    const { nome, foto, contatos, habilidades, linkedin, github, status, dataContratacao } = req.body;
    const novoCandidato = new Candidato(
        candidatoIdCounter++, nome, foto, contatos, habilidades, linkedin, github, status, dataContratacao
    );

    empresa.candidatos.push(novoCandidato);
    res.status(201).json(novoCandidato);
};

const obterCandidatosPorStatus = (req, res) => {
    const { empresaId } = req.params;
    const { status } = req.query;

    const empresa = empresas.find(e => e.id === parseInt(empresaId));
    if (!empresa) {
        return res.status(404).json({ error: "Empresa não encontrada" });
    }

    const candidatos = empresa.candidatos.filter(c => c.status === status);
    res.json(candidatos);
};

// Função para obter um candidato específico por ID
const obterCandidatoPorId = (req, res) => {

    const { empresaId, candidatoId } = req.params;
    const empresa = empresas.find(e => e.id === parseInt(empresaId));
    
    if (!empresa) {
        return res.status(404).json({ error: "Empresa não encontrada" });
    }

    const candidato = empresa.candidatos.find(c => c.id === parseInt(candidatoId));
    if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
    }

    res.json(candidato);
};

// Função para atualizar os dados de um candidato
const atualizarCandidato = (req, res) => {
    const { empresaId, candidatoId } = req.params;
    const { nome, foto, contatos, habilidades, linkedin, github, status, dataContratacao } = req.body;
    
    const empresa = empresas.find(e => e.id === parseInt(empresaId));
    if (!empresa) {
        return res.status(404).json({ error: "Empresa não encontrada" });
    }

    const candidato = empresa.candidatos.find(c => c.id === parseInt(candidatoId));
    if (!candidato) {
        return res.status(404).json({ error: "Candidato não encontrado" });
    }

    // Atualiza as propriedades do candidato
    candidato.nome = nome || candidato.nome;
    candidato.foto = foto || candidato.foto;
    candidato.contatos = contatos || candidato.contatos;
    candidato.habilidades = habilidades || candidato.habilidades;
    candidato.linkedin = linkedin || candidato.linkedin;
    candidato.github = github || candidato.github;
    candidato.status = status || candidato.status;
    candidato.dataContratacao = dataContratacao || candidato.dataContratacao;

    res.json(candidato);
};

// Função para deletar um candidato
const deletarCandidato = (req, res) => {
    const { empresaId, candidatoId } = req.params;
    
    const empresa = empresas.find(e => e.id === parseInt(empresaId));
    if (!empresa) {
        return res.status(404).json({ error: "Empresa não encontrada" });
    }

    const candidatoIndex = empresa.candidatos.findIndex(c => c.id === parseInt(candidatoId));
    if (candidatoIndex === -1) {
        return res.status(404).json({ error: "Candidato não encontrado" });
    }

    empresa.candidatos.splice(candidatoIndex, 1);
    res.json({ message: "Candidato removido com sucesso" });
};

module.exports = {
    criarEmpresa,
    obterEmpresas,
    obterEmpresaPorId,
    atualizarEmpresa,
    deletarEmpresa,
    adicionarCandidato,
    obterCandidatosPorStatus,
    obterCandidatoPorId, 
    atualizarCandidato,  
    deletarCandidato     
};
