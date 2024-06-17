import { DataTypes } from 'sequelize';
import Db from '../database';
import { ITendikModel } from '../interfaces/tendik-interface';
import UserModel from './user-model';
import { v4 as uuidv4 } from 'uuid';

const TendikModel = Db.define<ITendikModel>(
  'TendikModel',
  {
    tendikId: {
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
    nidn: {
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
    tableName: 'Tendiks',
    timestamps: true,
    underscored: true,
    paranoid: false,
  },
);

UserModel.hasOne(TendikModel, {
  foreignKey: 'userId',
  as: 'tendik',
});

TendikModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

export default TendikModel;
