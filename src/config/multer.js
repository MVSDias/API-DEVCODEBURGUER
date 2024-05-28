import multer from 'multer'
import { v4 } from 'uuid'
import { extname, resolve} from 'node:path' // caminho de acesso a pasta 

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'), // cada '..' representa uma pasta acima, navegando até pasta uploads
        filename: (request, file, callback) =>
             callback(null, v4() + extname(file.originalname)) /* filename função com 3 parametros(request, file, e função callback). não precisa colocar o return pq o calback está como uma arrow function sem chaves. o calback recebe duas coisas: o erro, que será null pq não queremos erro, e o file vai ter um id concatenado com o nome da imagem para não haver duas imagens com o mesmo nome. Essa é a forma de usar dada pela documentação do multer */
    })
}

