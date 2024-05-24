/* eslint-disable linebreak-style */

/* configuração para conectar o banco com o nosso código, fazendo a interface do usuario */

import Sequelize from 'sequelize';

import ConfigDatabase from '../config/database'; /* passando a configuração do banco */

import User from '../app/models/User';

const models = [User]; // criando o array consigo usar o método map para 
class Database {
  constructor() {
    this.init();
    /*  toda vez q a classe for instanciada
        vai chamar o metodo init */
  }

  init() {
    this.connection = new Sequelize(ConfigDatabase); /* instância e inicializa o sequelize */
    models.map((model) => model.init(this.connection));
    /* para cada model vou chamar o metodo init da class pai Models, dentro de
    models/User.js, passando o sequelize que é a conexão com o banco
    (this.connection) - conexão com o banco - todas as models vão usar a mesma conexão com o banco
    evitando abrir uma nova toda vez, evitando gargalos no acesso ao banco. */
  }
}

export default new Database();
