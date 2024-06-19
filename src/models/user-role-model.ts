import { DataTypes } from 'sequelize';
import Db from '../database';
import UserModel from './user-model';
import RoleModel from './role-model';
import { IUserRoleModel } from '../interfaces/user-role-interface';
import { v4 as uuidv4 } from 'uuid';

const UserRoleModel = Db.define<IUserRoleModel>(
  'UserRoleModel',
  {
    userRoleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'userId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: RoleModel,
        key: 'roleId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
    tableName: 'UsersRoles',
    timestamps: true,
    underscored: true,
    paranoid: false,
  },
);

UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: 'userId',
  otherKey: 'roleId',
});

RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: 'roleId',
  otherKey: 'userId',
});

export default UserRoleModel;
