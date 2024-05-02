/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/** responsável por fazer a configuração e conexão com o banco de dados */

import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcrypt';

/* // extends significa q a class User é filha
da class Model e herda seus metodos */

class User extends Model {
  /* static permite disponibilizar os metodos
    sem instanciar a class */

  static init(sequelize) {
    super.init(
      /* O super() serve para chamar o construtor da classe model(pai) e não da filha (User).
      Ele sempre é chamado, mesmo quando não está explícito no código,
      quando for explicitado deve ser o primeiro item dentro do construtor */
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },

      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    }); 
    
    return this;
  }
}

export default User;
    
/** return this => deixo tudo disponivel dentro da aplicação */
    
/** o this, como o super, me permite acessar os metodos do pai(Model). O addHook adiciona uma ação em um certo momento que o sequelize está fazendo uma ação no banco. Passo também uma função de callback(funçao onde passo o parâmetro de outra função na função ex.(user)=>{}). Para encryptação da senha usamos o bcrypt numa função async/await. como parametros do bcrypt.hash, passamos a senha de usuário(user.password, e o nível de dificuldade da encriptação (10 vezes encryptada))  */
