class Candidato {
    constructor(id, nome, foto, contatos, habilidades, linkedin, github, status = "não contratado", dataContratacao = null) {
        this.id = id;
        this.nome = nome;
        this.foto = foto;
        this.contatos = contatos;
        this.habilidades = habilidades;
        this.linkedin = linkedin;
        this.github = github;
        this.status = status;
        this.dataContratacao = dataContratacao;
    }
}

module.exports = Candidato;
