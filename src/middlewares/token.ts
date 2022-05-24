import { sign, SignOptions, verify } from 'jsonwebtoken';

const JWT_SECRET = 'maytheforcebewithyou';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export function generateToken(id: number, username: string) {
  return sign({ id, username }, JWT_SECRET, jwtConfig);
}

export function validateToken(authorization: string) {
  return verify(authorization, JWT_SECRET);
}