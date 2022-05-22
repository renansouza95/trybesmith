import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/user';

export default class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: IUser): Promise<IUser> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}