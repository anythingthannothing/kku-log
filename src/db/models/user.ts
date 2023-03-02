import { User } from '../schemas/user';

class UserModel {
  constructor(private user) {}

  create = async (userInfo) => {
    return await this.user.create(userInfo);
  };

  findOne = async (email) => {
    return await this.user.findOne({ email });
  };
}

export const userModel = new UserModel(User);
