import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
    async store(request, response){ // método store pra criar uma sessão

        const schema  = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string(). min(6).required()
        })

         /* 1º validação - verificando se os dados estão no formato correto */

        const isValid = await schema.isValid(request.body) // validando asincrona - espero ele validar - pego essa informação no request.body
        
        const emailOrPassworldIncorrect = () => { // crio uma função de resposta para todas as validações
           response
           .status(401)
           .json({message: 'Make sure your email or password are correct'})
        }
        
        if (!isValid){ // se não for valido, paro a app e envio a mensagem de erro
            return emailOrPassworldIncorrect()
        }

        /* recuperar os dados de usuário para comparar e fazer a validação e vê se o usuário existe */

        const { email, password } = request.body

        /* 2º validação - verificando se email já está cadastrado na base de dados */

        const user = await User.findOne({ // agaurdo a verificação pra ver se existe pelo menos 1 email igual
            where: { // procuro aonde? email.
                email,
            }
        }) 

        if(!user){
            return emailOrPassworldIncorrect()
        }

        /* 3º validação - verificar se a senha "bate" com a cadastrada */

        const isSamePassword = await user.checkPassword(password) /* crio uma constante para armazenar a validação da senha, e passo a senha no metodo checkPassword */

        if(!isSamePassword){
            return emailOrPassworldIncorrect()
        }

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin
        })
    }
}
export default new SessionController()