import connection from '../models/connection';
import OrderModel from '../models/order';
import IOrder from '../interfaces/order';
import IToken from '../interfaces/token';
import { validateToken } from '../middlewares/token';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<IOrder[]> {
    const response = await this.model.getAll();
    return response;
  }

  public async create(authorization: string, productsIds: number[]) {
    const decoded = validateToken(authorization);
    const obj = decoded as IToken; // https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data
    const { id } = obj;
    const response = await this.model.create(id, productsIds);
    return response;
  }
}