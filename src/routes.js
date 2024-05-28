/* eslint-disable linebreak-style */

/** criando as rotas  */

import { Router } from 'express'; // import a classe Router de dentro do express, de modo desestruturado.
import multer from 'multer'
import multerConfig from './config/multer' // importando a configuração do multer criado em config
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

const routes = new Router(); // instanciando uma nova class de router em routes

const upload = multer(multerConfig) // salvo o multer passando a configuração do multer (multerConfig) na constante upload

routes.post('/users', UserController.store); // rota de criar usuário
/** como o UserController foi exportado
já instanciado, posso usar o metodo
store e passa-lo como referencia, o post
passa para  dentro dele o request e response */
routes.post('/session', SessionController.store) // rota de validação de usuario no login
routes.post('/products', upload.single('file'), ProductController.store) // rota de criação de produtos. O upload.single é referente a uma e apenas uma (single) imagem do produto e file é o nome do campo que nosso "cliente"(insomnia) vai passar e salvar o arquivo na pasta uploads.
routes.get('/products', ProductController.index) // rota que lista os produtos e ainda recupera o url das imagens

export default routes;
