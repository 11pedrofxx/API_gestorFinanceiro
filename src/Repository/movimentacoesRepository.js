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