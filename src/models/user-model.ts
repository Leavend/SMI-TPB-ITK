import { DataTypes } from 'sequelize';
import Db from '../database';
import { IUserModel } from '../interfaces/user-interface';
import { v4 as uuidv4 } from 'uuid';

const UserModel = Db.define<IUserModel>(
  'UserModel',
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    accountStatus: {
      type: DataTypes.STRING,
      defaultValue: 'active',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    major: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    study_program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);

export default UserModel;
