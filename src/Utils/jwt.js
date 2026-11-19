import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET;

export function GerarToken(usuarioInfo) {
    const payload = {
        ...usuarioInfo
    };

    return jwt.sign(payload, KEY, { expiresIn: '2h' });
}

export function VerifcarToken(token) {
    return jwt.verify(token, KEY);
}