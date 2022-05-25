import { Pool, ResultSetHeader } from 'mysql2/promise';
import IOrder from '../interfaces/order';
import ProductModel from './product';

export default class OrderModel {
  connection: Pool;

  public model: ProductModel;

  constructor(connection: Pool) {
    this.connection = connection;
    this.model = new ProductModel(connection);
  }

  // Feito com ajuda do colega Miyazaki
  public async getAll(): Promise<IOrder[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Orders'); // JOIN ?
    const [rows] = result;
    const orders = rows as IOrder[];
    const prodArray = orders.map(({ id }) => this.model.getById(id as number));
    const resolved = await Promise.all(prodArray);
    const joinedArrays = orders.map((e1, index) => ({
      ...e1,
      productsIds: resolved[index].map(({ id }) => id),
    }));
    return joinedArrays as IOrder[];
  }

  public async create(id: number, productsIds: number[]): Promise<IOrder> {
    const createOrder = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [id],
    );
    console.log(createOrder);
    const [dataInserted] = createOrder;
    const { insertId } = dataInserted;
    productsIds.forEach(async (product) => {
      await this.model.update(insertId, product);
    });
    const response = { userId: id, productsIds };
    return response;
  }
}