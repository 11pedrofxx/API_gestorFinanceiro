
export function ValidarUser(usuario) {

    if (!usuario.nome || usuario.nome === '') {
        throw new Error('O campo "nome" não pode ficar vazio')
    }

    if (!usuario.email || usuario.email === '') {
        throw new Error('O campo "email" não pode ficar vazio')
    }
    if (!usuario.senha || usuario.senha === '') {
        throw new Error('O campo "senha" não pode ficar vazio')
    }

    if (usuario.senha.length < 8) {
        throw new Error('A senha deve ter pelo menos 8 digitos')
    }

    if (!/[A-Z]/.test(usuario.senha)) {
        throw new Error('Sua senha deve conter uma letra maiúscula.')
    }

    if (!/[a-z]/.test(usuario.senha)) {
        throw new Error('Sua senha deve conter uma letra minúscula.')
    }
    if (!/[0-9]/.test(usuario.senha)) {
        throw new Error('Sua senha deve conter um número.')
    }
    if (!/[^a-zA-Z0-9]/.test(usuario.senha)){
        throw new Error('Sua senha deve conter um caractere especial.')
    }
    
}