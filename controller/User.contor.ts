import db from "../models";
import type { UserCreationAttributes } from "../models/User";
class UserService {
  createUser = async (options: UserCreationAttributes) => {
    return await db.User.create(options);
  };
  getUserInfo = async (username: string) => {
    const res = await db.User.findOne({
      where: { username: username },
      raw: true,
    });
    return res;
  };
  userLogin = async (options: UserCreationAttributes) => {
    const res = await this.getUserInfo(options.username);
  };
}
export default new UserService();
