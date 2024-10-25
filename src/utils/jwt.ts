import jwt from 'jsonwebtoken';
import { JwtObject } from '../types/jwt.type';

export const signJwt = (payload: JwtObject, expiresIn: string): string => {
    return jwt.sign(payload, getJWTSecret(), { expiresIn });
};

export const verifyJWT = (token: string): JwtObject => {
        const decoded = jwt.verify(token, getJWTSecret()) as JwtObject;
        return decoded;
};

function getJWTSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT secret not found. Exiting server...');
        process.exit(1);
    }
    return secret;
}
