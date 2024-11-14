class Empresa {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.candidatos = [];  // Armazena candidatos monitorados pela empresa
    }
}

const empresas = []; // Simulação de banco de dados em memória

module.exports = { Empresa, empresas };
