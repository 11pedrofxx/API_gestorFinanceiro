import User from './Controller/userController.js';
import Movimentacoes from './Controller/MovimentacoesController.js'

export default function addRoutes(api) {

    api.use(User)
    api.use(Movimentacoes)

}