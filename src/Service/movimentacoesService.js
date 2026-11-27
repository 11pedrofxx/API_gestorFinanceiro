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

export async function ConsultaSaldoService(id) {
    
    let consulta = await repo.consultarID(id);
    if (isNaN(id)) {
        throw new Error('Informe o número do id.')
    }
    if (consulta.length === 0) {
        throw new Error('O id informado não existe ou está indisponivel')
    }


    let saldo = await repo.verSaldo(id);
    return saldo;

}

export async function DeletarMovimentacaoService(idMovimentacao, usuarioId) {
    if (!idMovimentacao) {
        throw new Error('Informe o idMovimentacao para excluir.');
    }

    const linhasAfetadas = await repo.deletarMovimentacao(idMovimentacao, usuarioId);
    return linhasAfetadas;
}