import connection from '../models/connection';
import OrderModel from '../models/order';
import IOrder from '../interfaces/order';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<IOrder[]> {
    const response = await this.model.getAll();
    return response;
  }
}