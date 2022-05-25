import connection from '../models/connection';
import UserModel from '../models/user';
import ILogin from '../interfaces/login';
import { generateToken } from '../middlewares/token';

export default class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getByUser(user: ILogin): Promise<string> {
    const { username, password } = user;
    const response = await this.model.getByUser(username, password);
    if (!response) {
      return 'Username or password invalid';
    }
    const { id } = response;
    const ID = id as unknown as number;
    const token = generateToken(ID, username);
    return token;
  }
}