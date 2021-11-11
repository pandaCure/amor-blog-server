import { Model, Sequelize, DataTypes, Optional } from "sequelize";
export interface UserAttributes {
  id: number;
  password: string;
  username: string;
}
export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
const user = (sequelize: Sequelize) => {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: number;
    public password!: string;
    public username!: string;
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
export default user;
