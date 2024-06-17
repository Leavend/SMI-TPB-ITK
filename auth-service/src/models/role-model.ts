import { DataTypes } from 'sequelize';
import Db from '../database';
import { IRoleModel } from '../interfaces/role-interface';
import { v4 as uuidv4 } from 'uuid';

const RoleModel = Db.define<IRoleModel>(
  'RoleModel',
  {
    roleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING,
      unique: true,
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
    tableName: 'Roles',
    timestamps: true,
    underscored: true,
  },
);

export default RoleModel;
