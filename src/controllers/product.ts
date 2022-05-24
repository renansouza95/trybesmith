import { Request, Response } from 'express';
import ProductService from '../services/product';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const products = await this.productService.getAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const product = req.body;
      const productCreated = await this.productService.create(product);
      return res.status(201).json(productCreated);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}