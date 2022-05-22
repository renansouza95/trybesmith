import { Request, Response } from 'express';
import ProductService from '../services/product';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const products = await this.productService.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const product = req.body;
      const productCreated = await this.productService.create(product);
      res.status(201).json(productCreated);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}