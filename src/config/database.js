/* eslint-disable linebreak-style */

/** configuração do banco de dados */

module.exports = {
  dialect: 'postgres', // qual a linguagem/banco
  host: 'localhost', // qual a port - por padrao é 5432
  port: 5432,
  username: 'postgres', // nome de usuario
  password: 'postgres', // senha do usuario criada no banco de dados
  database: 'devburguer', // nome do banco de dados
  define: {
    timestamps: true, // salva a hora q foi criado e alterado o usuario
    underscored: true,
    underscoredAll: true, // seta o metodo de separação
    // de palavras como snake_case, ou seja, separados por underline.
  },
};
