class Empresa {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.candidatos = [];  
    }
}

const empresas = [];

module.exports = { Empresa, empresas };
