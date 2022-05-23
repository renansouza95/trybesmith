import connection from '../models/connection';
import UserModel from '../models/user';
import IUser from '../interfaces/user';
import { generateToken } from '../middlewares/token';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: IUser) {
    const { id, username } = await this.model.create(user);
    const ID = id as unknown as number;
    const token = generateToken(ID, username);
    return token;
  }
}