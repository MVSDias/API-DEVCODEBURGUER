/* eslint-disable linebreak-style */
import express from 'express';
import { resolve } from 'node:path'

import routes from './routes';


import './database'; /* pq dessa forma já instancia a classe database direto e fazendo a conexão. não vou usar o "database" aqui */

class App {
  // constructor executa tudo que tem dentro assim q minha classe(App) é instanciada.
  constructor() {
    this.app = express(); // instancio o expresse
    // salvo em 'this.app' antes fazia
    // const app = express()

    this.middlewares(); // aqui chamo o metodo middleware e o metodo routes(rotas)
    this.routes();
  }

  middlewares() {
    this.app.use(express.json()); // aviso ao app
    // (this.app) que vou usar o padrão json de comunicação
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads'))) // "avisando" ao express que toda vez que bater na rota product-file, eu quero que vc (express) "sirva" os arquivos, de forma estatica, dentro da pasta com caminho (resolve(__dirname, '..', 'uploads')) 
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
// exportando a instância da minha app express para ser usada em outros arquivos
