import * as db from '../Repository/userRepository.js';
import { ValidarUser } from '../Validation/UserTable/CriarContaValidation.js';
import bcrypt from 'bcrypt'

export async function CriarContaService(usuario) {
    console.log('entrou no service')
    ValidarUser(usuario);
    console.log('passou pela validação')
    const senha_hash = await bcrypt.hash(usuario.senha, 10);
    let objUser = {
        nome: usuario.nome,
        email: usuario.email,
        senha: senha_hash
    }

    let linhasAfetadas = await db.CriarConta(objUser);
    return linhasAfetadas;

}