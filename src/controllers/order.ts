import { Request, Response } from 'express';
import OrderService from '../services/order';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.orderService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}