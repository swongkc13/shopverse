import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db';

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: 'user' | 'admin';
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
