import Sequelize, { Model } from 'sequelize'

class Product extends Model{ // criando modelo de produto - tudo que terá na tabela de produto

    static init(sequelize){
        super.init(
         { // propriedase da models de produtos
           name: Sequelize.STRING,
           price: Sequelize.INTEGER,
           category: Sequelize.STRING,
           path: Sequelize.STRING,
           url:{ // criando um campo virtual para expor as imagens, não será salvo no banco. posso retornar pra api se eu quiser
            type: Sequelize.VIRTUAL,
            get(){ // metodo get - toda vez q recuperar a informação, vai gerar esse campo virtual pra mim, retornando a url
                return `http://localhost:3003/product-file/${this.path}` // assim q o "express" vai recuperar essas imagens
            }
           }  
         },
         {
           sequelize
         },
       )
    }
}

export default Product