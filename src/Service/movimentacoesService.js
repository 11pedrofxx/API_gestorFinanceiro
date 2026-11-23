import * as repo from '../Repository/movimentacoesRepository.js';

export async function EntradaService(usuario_id, info) {

    if (!info.descricao || info.descricao === '') {
        throw new Error('Você deve descrever essa entrada');
    }
    console.log('Passou pela validacao')

    if (isNaN(info.valor) || info.descricao === '') {
        throw new Error('Você informar o valor dessa entrada');
    }

    let linhasAfetadas = await repo.registarEntrada(usuario_id, info);
    return linhasAfetadas;

}