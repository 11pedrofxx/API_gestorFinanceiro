import * as repo from '../Repository/movimentacoesRepository.js';

export async function EntradaService(usuario_id, info) {

    if (!info.descricao || info.descricao === '') {
        throw new Error('Você deve descrever essa entrada');
    }

    if (isNaN(info.valor) || info.valor === '') {
        throw new Error('Você informar o valor dessa entrada');
    }

    let linhasAfetadas = await repo.registarEntrada(usuario_id, info);
    return linhasAfetadas;

}

export async function SaidaService(usuario_id, info) { 

    if (!info.descricao || info.descricao === '') {
        throw new Error('Você deve descrever essa saída');
    }

    if (isNaN(info.valor) || info.valor === '') {
        throw new Error('Você informar o valor dessa saída');
    }

    let linhasAfetadas = await repo.registrarSaida(usuario_id, info);
    return linhasAfetadas;

}