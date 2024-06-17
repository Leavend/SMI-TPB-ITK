import { DataTypes } from 'sequelize';
import Db from '../database';
import { IMahasiswaModel } from '../interfaces/mahasiswa-interface';
import UserModel from './user-model';
import { v4 as uuidv4 } from 'uuid';

const MahasiswaModel = Db.define<IMahasiswaModel>(
  'MahasiswaModel',
  {
    mahasiswaId: {
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
    nim: {
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
    tableName: 'Mahasiswas',
    timestamps: true,
    underscored: true,
    paranoid: false,
  },
);

UserModel.hasOne(MahasiswaModel, {
  foreignKey: 'userId',
  as: 'mahasiswa',
});

MahasiswaModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

export default MahasiswaModel;
