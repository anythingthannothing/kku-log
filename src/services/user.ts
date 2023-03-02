import { userModel } from '../db/models/user';

class UserService {
  constructor(private userModel) {}

  createUser = async (userInfo) => {
    return this.userModel.create(userInfo);
  };

  findUserByEmail = async ({ email }) => {
    return this.userModel.findOne(email);
  };
}

export const userService = new UserService(userModel);
