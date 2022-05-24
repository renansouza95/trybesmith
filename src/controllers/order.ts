import { Request, Response } from 'express';
import OrderService from '../services/order';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.orderService.getAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}