import connection from './connection.js';

export async function registarEntrada(usuario_id, info) {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const command = `
        insert into movimentacoes (usuario_id, tipo, descricao, valor)
        values (?, 'Entrada', ?, ?);
        `

        let resposta = await conn.query(command, [
            usuario_id,
            info.descricao,
            info.valor

        ]);

        let informacoes = resposta[0];

        let tipo = 'Entrada'
        await editarSaldo(conn, tipo, info, usuario_id)

        await conn.commit();
        return informacoes.affectedRows;

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }



}

export async function registrarSaida(usuario_id, info) {

    const conn = await connection.getConnection();

    try {
        
        await conn.beginTransaction();

        const commandSaida = `
        insert into movimentacoes (usuario_id, tipo, descricao, valor)
        values (?, 'Saida', ?, ?);
        `

        let resposta = await conn.query(commandSaida, [
            usuario_id,
            info.descricao,
            info.valor
        ]);

        let informacoes = resposta[0];

        let tipo = 'Saida'
        await editarSaldo(conn, tipo, info, usuario_id)

        await conn.commit();
        return informacoes.affectedRows;

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }

}

export async function editarSaldo(conn, tipo, info, usuario_id) {

    if (tipo === 'Entrada') {
        const commandSaldo = `
        update usuarios
        set saldo = saldo + ?
        where id = ?
        `

        await conn.query(commandSaldo, [
            info.valor,
            usuario_id
        ]);
    }

    else {

        const commandSubtrairSaldo = `
        update usuarios
        set saldo = saldo - ?
        where id = ?
        `

        await conn.query(commandSubtrairSaldo, [
            info.valor,
            usuario_id
        ])

    }

}

export async function verSaldo(id) {
    
    const command = `
    select saldo from usuarios
    where id = ?
    `

    let resposta = await connection.query(command, [id]);
    return resposta[0];
    


}

export async function consultarID(id) {
    
    const command = `
    select * from usuarios
    where id = ?
    `

    let resposta = await connection.query(command, [id]);
    let info = resposta[0];
    return info

}
export async function deletarMovimentacao(idMovimentacao, usuarioId) {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const movimentacoes = await buscarMovimentacao(conn, idMovimentacao, usuarioId);

        if (movimentacoes.length === 0) {
            throw new Error('Movimentação não encontrada para este usuário.');
        }

        const movimentacao = movimentacoes[0];
        const valor = Number(movimentacao.valor);

        await estornarSaldo(conn, movimentacao.tipo, valor, usuarioId);

        const commandDelete = `
            delete from movimentacoes
            where id = ? and usuario_id = ?
        `;

        const [resultado] = await conn.query(commandDelete, [idMovimentacao, usuarioId]);

        await conn.commit();
        return resultado.affectedRows;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

export async function buscarMovimentacao(conn, idMovimentacao, usuarioId) {
    const command = `
        select id, usuario_id, tipo, valor
        from movimentacoes
        where id = ? and usuario_id = ?
    `;

    const [linhas] = await conn.query(command, [idMovimentacao, usuarioId]);
    return linhas;
}

async function estornarSaldo(conn, tipo, valor, usuarioId) {
    let command;

    if (tipo === 'Entrada') {
        command = `
            update usuarios
            set saldo = saldo - ?
            where id = ?
        `;
    } else if (tipo === 'Saida') {
        command = `
            update usuarios
            set saldo = saldo + ?
            where id = ?
        `;
    } else {
        throw new Error('Tipo de movimentação inválido para estorno.');
    }

    const [resultado] = await conn.query(command, [valor, usuarioId]);
    return resultado.affectedRows;
}