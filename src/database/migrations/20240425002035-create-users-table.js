/** @type {import('sequelize-cli').Migration}  */
/* Criando a tabela do banco */

module.exports = {
  async up(queryInterface, Sequelize) { // metodo up - subir a tabela de usuários criada aqui dentro
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true, // o id de um banco é uma chave primária e nunca se repete
        allowNull: false, // permitir campo vazio? falso
        type: Sequelize.UUID, // id universal unico
        defaultValue: Sequelize.UUIDV4,
      },

      name: {
        type: Sequelize.STRING, // tipo string
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // email tem q ser unico. verifica se já está sendo usado no banco de dados
      },

      password_hash: { // senha encryptografada
        type: Sequelize.STRING,
        allowNull: false,
      },

      admin: {
        type: Sequelize.BOOLEAN, // verdadeiro ou falso
        defaultValue: false, /* por padrão, todo usuário criado tera,
        // valor de admin falso, exceto os definidos como admin */
      },

      created_at: { // informações de auditoria - guardam as datas de criação,
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: { // informações de auditoria - guardam as datas de modificação
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
  },

  async down(queryInterface) { // desfaz o que foi criado/ feito no metodo up
    await queryInterface.dropTable('users'); // exclui a tabela (droptable) de  users
  },

};
