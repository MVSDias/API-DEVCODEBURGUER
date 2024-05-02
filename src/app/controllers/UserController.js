/* eslint-disable linebreak-style */
/** recebe as informações, faz a s ligações, regras de negócios. */

/* O UserController é uma classe e vai chamar o Model */

/** metodos dentro da classe UseController

 * store => Cadastrar / Adicionar
 * index => Listar vários
 * show => Mostrar apenas um
 * update => Atualizar
 * delete => deletar

  não é obrigatório ter todos, mas NUNCA teremos dois iguais.
 */

import { v4 } from 'uuid';
import * as Yup from 'yup';
/** "*" significa que estou importando
 * tudo de dentro do yup como Yup.
 */
import User from '../models/User';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      /** schema - validação dos dados */
      // eslint-disable-next-line max-len
      name: Yup.string().required(), /** significa: que tem q ser string e é obrigatório(required) */
      email: Yup.string().email().required(),
      /** fortmato email */
      password: Yup.string().min(6).required(),
      /** minnimo 6 caracteres */
      // eslint-disable-next-line max-len
      admin: Yup.boolean(),
    }); // eslint-disable-next-line max-len
    /** não é obrigatorio colocar se é admin, pq se está em braco o banco de dados já preeenche automático */
    
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    // eslint-disable-next-line max-len
    } /** Validação para saber se os dados atende os requisitos do banco. O 'abortEarly' como false, faz com que a validação vá até o fim, sem parrar logo no primeiro erro que encontra. */

    const {
      name, email, password, admin,
    } = request.body;
    
    /** verificando se o email já é cadastrado */
    const userExist = await User.findOne({
      
      where: {
        email,
      },
    });

    if (userExist) {
      /** email já cadastrado retorna erro */
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });
    
    return response.status(201).json({
      id: user.id,
      name,
      email,
      admin,
    });

    /** em vez de enviar o user completo(return
response.status(201).json(user)) com password e
timestamps, que não interessa ao usuario comum,
faço a desconstrução do user(return response.status(201).
json({id: user.id, name, email, admin, });)
 */
  }
}

export default new UserController();
