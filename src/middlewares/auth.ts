import { NextFunction, Request, Response } from 'express';
import { UserSchema, ProductSchema } from './schemas';

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const { error } = UserSchema.validate(req.body);
  if (error && error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('must be')) {
    return res.status(422).json({ message: error.message });
  }
  next();
}

export function authenticateProduct(req: Request, res: Response, next: NextFunction) {
  const { error } = ProductSchema.validate(req.body);
  if (error && error.message.includes('required')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('must be')) {
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