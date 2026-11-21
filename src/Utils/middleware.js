import { VerifcarToken } from '../Utils/jwt.js';
import { padraoErro } from '../Utils/erroGlobal.js';

export function autenticarToken(req, resp, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return resp.status(401).send(padraoErro(new Error('Token de autenticação não informado')));
        }

        const [tipo, token] = authHeader.split(' ');

        if (tipo !== 'Bearer' || !token) {
            return resp.status(401).send(padraoErro(new Error('Formato de token inválido')));
        }

        const usuarioDecodificado = VerifcarToken(token);
        req.usuario = usuarioDecodificado;

        return next();
    } catch (error) {
        return resp.status(401).send(padraoErro(new Error('Token inválido ou expirado')));
    }
}