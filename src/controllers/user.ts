import { Request, Response } from 'express';
import UserService from '../services/user';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const token = await this.userService.create(user);
      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}