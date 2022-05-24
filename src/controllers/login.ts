import { Request, Response } from 'express';
import LoginService from '../services/login';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public getByUser = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const response = await this.loginService.getByUser(user);
      if (response.includes('invalid')) return res.status(401).json({ message: response });
      return res.status(200).json({ token: response });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}