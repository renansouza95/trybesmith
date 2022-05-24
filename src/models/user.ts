import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/user';
import ILogin from '../interfaces/login';

export default class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByUser(username: string, password: string): Promise<ILogin> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users where username = ? AND password = ?',
      [username, password],
    );
    const [rows] = result;
    const [user] = rows as ILogin[];
    return user;
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