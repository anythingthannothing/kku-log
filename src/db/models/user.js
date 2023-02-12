import { User } from '../schemas/user';

class UserModel {
  static async create(userInfo) {
    const newUser = await User.create(userInfo);
    return newUser;
  }

  static async findOne(email) {
    const user = await User.findOne({ email });
    return user;
  }
}

export { UserModel };
