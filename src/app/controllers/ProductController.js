/** metodos dentro da classe UseController

 * store => Cadastrar / Adicionar
 * index => Listar vários
 * show => Mostrar apenas um
 * update => Atualizar
 * delete => deletar

  não é obrigatório ter todos, mas NUNCA teremos dois iguais.
 */


import * as Yup from 'yup'
import Product from '../models/Product'

class ProductController{
    async store(request, response){ // cadastrar produtos
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
        })

        try { // validação do produto
            schema.validateSync(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }
        
        const {filename: path} = request.file // recupero a informação do file . Quando desestruturo e coloco ":" é pq estou renomeando, nesse caso,  a propriedade filename, dentro de file, para path. 
        const {name, price, category} = request.body // recupero o resto das informações dentro de request.body

        const products = await Product.create({ // criando o registro dessas informações no banco de dados
            name,
            price,
            category,
            path,
        })

        console.log(path)
        return response.status(201).json(products) // retorno essas informações no insomnia
    }

    async index(request, response){ // listar todos os produtos (findAll)
        const products = await Product.findAll() // armazeno todos os produtos q encontrar no banco e armazeno na constante products
        return response.json(products)
    }
}

export default new ProductController()