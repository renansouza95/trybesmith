import { sign, SignOptions, verify } from 'jsonwebtoken';

const JWT_SECRET = 'maytheforcebewithyou';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export function generateToken(id: number) {
  sign({ id }, JWT_SECRET, jwtConfig);
}

export function validateToken(authorization: string) {
  verify(authorization, JWT_SECRET);
}