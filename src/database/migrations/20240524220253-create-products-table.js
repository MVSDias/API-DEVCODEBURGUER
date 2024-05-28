
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('products', { 
    id:{
      type: Sequelize.INTEGER, // tipo inteiro, vai ser de 1 em 1
      allowNull: false, // permitir nulo? falso
      primaryKey: true, // chave primaria? sim
      autoIncrement: true, // o numero vai aumentando automaticamente
    },
    name:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    price:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    path:{ // caminha da imagem para expor o produto no frontend numa url
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at:{
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull: false,
    },
   });
    
  },

  async down (queryInterface) {// desfaz o que foi criado/ feito no metodo up
   await queryInterface.dropTable('products'); // exclui a tabela (droptable) de produtos
     
  }
};
