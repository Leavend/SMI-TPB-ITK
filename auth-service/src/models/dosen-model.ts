import { DataTypes } from 'sequelize';
import Db from '../database';
import { IDosenModel } from '../interfaces/dosen-interface';
import UserModel from './user-model';
import { v4 as uuidv4 } from 'uuid';

const DosenModel = Db.define<IDosenModel>(
  'DosenModel',
  {
    dosenId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: UserModel,
        key: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    nip: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'Dosens',
    timestamps: true,
    underscored: true,
    paranoid: false,
  },
);

UserModel.hasOne(DosenModel, {
  foreignKey: 'userId',
  as: 'dosen',
});

DosenModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

export default DosenModel;
