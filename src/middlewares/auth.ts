import { NextFunction, Request, Response } from 'express';
import { UserSchema, ProductSchema } from './schemas';
import { validateToken } from './token';

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const { error } = UserSchema.validate(req.body);
  if (error && error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('must')) {
    return res.status(422).json({ message: error.message });
  }
  next();
}

export function authenticateProduct(req: Request, res: Response, next: NextFunction) {
  const { error } = ProductSchema.validate(req.body);
  if (error && error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('must')) {
    return res.status(422).json({ message: error.message });
  }
  next();
}

export function authenticateLogin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  if (!username) return res.status(400).json({ message: '"username" is required' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  next();
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    validateToken(authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
}

export function authenticateOrder(req: Request, res: Response, next: NextFunction) {
  const { productsIds } = req.body;
  if (!productsIds) return res.status(400).json({ message: '"productsIds" is required' });
  if (!Array.isArray(productsIds)) {
    return res.status(422).json({ message: '"productsIds" must be an array' });
  }
  if (productsIds.length === 0) {
    return res.status(422).json({ message: '"productsIds" must include only numbers' });
  }
  // if (productsIds.some((id: number) => typeof id !== 'number' && !Number.isNaN(id))) {
  //   return res.status(422).json({ message: '"productsIds" must include only numbers' });
  // }
  next();
}