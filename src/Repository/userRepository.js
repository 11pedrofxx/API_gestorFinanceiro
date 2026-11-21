import connection from "./connection.js";

export async function CriarConta(usuario) {

    console.log('entrou no repo')
    const command = `
    insert into usuarios (nome, email, senha_hash)
    values (?, ?, ?)
    `

    let resposta = await connection.query(command, [
        usuario.nome,
        usuario.email,
        usuario.senha
    ]);
    let info = resposta[0];
    return info.affectedRows;
}