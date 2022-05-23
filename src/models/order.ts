import { Pool } from 'mysql2/promise';
import IOrder from '../interfaces/order';

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Orders'); // JOIN ?
    const [rows] = result;
    return rows as IOrder[];
  }

  // public async create(order: IOrder): Promise<IOrder> {
  //   const { productsId } = order;
  //   const result = await this.connection.execute<ResultSetHeader>(
  //     'INSERT INTO Trybesmith.Orders (productsId)'
  //   )
  // }
}