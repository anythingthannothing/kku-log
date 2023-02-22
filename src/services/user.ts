import { UserModel } from '../db/models/user';

class UserService {
  static async createUser(userInfo) {
    const newUser = await UserModel.create(userInfo);
    return newUser;
  }

  static async findUserByEmail({ email }) {
    const user = await UserModel.findOne(email);
    return user;
  }
}

export { UserService };
