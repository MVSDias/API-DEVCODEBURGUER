/* eslint-disable linebreak-style */

/** criando as rotas  */

import { Router } from 'express'; // import a classe Router de dentro do express, de modo desestruturado.
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

const routes = new Router(); // instanciando uma nova class de router em routes

routes.post('/users', UserController.store); // rota de criar usuário
/** como o UserController foi exportado
já instanciado, posso usar o metodo
store e passa-lo como referencia, o post
passa para  dentro dele o request e response */
routes.post('/session', SessionController.store) // rota de validação de usuario no login
routes.post('/products', ProductController.store) // rota de criação de produtos

export default routes;
