export function padraoErro(error) {
    return {
        erro: error?.message
    };
}