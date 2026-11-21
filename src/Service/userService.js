import * as db from '../Repository/userRepository.js';
import { GerarToken } from '../Utils/jwt.js';
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

export async function LoginService(info) {

    if (!info.email || info.email === '') {
        throw new Error('Email ou senha inválidos')
    }
    if (!info.senha || info.senha === '') {
        throw new Error('Email ou senha inválidos')
    }

    let resposta = await db.BuscarEmail(info.email);

    if(!resposta) {
        throw new Error('Email ou senha inválidos')
    }

    let senha = await bcrypt.compare(info.senha, resposta.senha_hash);

    if (senha === true) {
        let obj = {
            id: resposta.id,
            nome: resposta.nome,
            email: resposta.email
        }

        let token = GerarToken(obj);

        return {
            token: token
        };
    }
    else {
        throw new Error('Email ou senha inválidos')
    }


}