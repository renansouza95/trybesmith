import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/product';

export default class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as IProduct[];
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public async getById(id: number): Promise<IProduct[]> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products where orderId = ?',
      [id],
    );
    const [rows] = result;
    return rows as IProduct[];
  }

  public async update(orderId: number, productId: number): Promise<IProduct[]> {
    const result = await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, productId],
    );
    const [rows] = result;
    const product = rows as IProduct[];
    return product;
  }
}