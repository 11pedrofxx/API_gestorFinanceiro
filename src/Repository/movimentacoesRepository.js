import connection from './connection.js';

export async function registarEntrada(usuario_id, info) {

    const command = `
        insert into movimentacoes (usuario_id, tipo, descricao, valor)
        values (?, 'entrada', ?, ?);
    `

    let resposta = await connection.query(command, [
        usuario_id,
        info.descricao,
        info.valor

    ]);

    let informacoes = resposta[0];
    return informacoes.affectedRows;

}