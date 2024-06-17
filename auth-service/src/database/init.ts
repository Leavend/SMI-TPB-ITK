import DosenModel from '../models/dosen-model';
import MahasiswaModel from '../models/mahasiswa-model';
import RoleModel from '../models/role-model';
import TendikModel from '../models/tendik-model';
import TokenModel from '../models/token-model';
import UserModel from '../models/user-model';
import UserRoleModel from '../models/user-role-model';
import Db from './index';

const DbInitialize = async () => {
  try {
    await Db.authenticate();
    await UserModel.sync({ alter: false });
    await RoleModel.sync({ alter: false });
    await MahasiswaModel.sync({ alter: false });
    await DosenModel.sync({ alter: false });
    await TendikModel.sync({ alter: false });
    await UserRoleModel.sync({ alter: false });
    await TokenModel.sync({ alter: false });
    console.log('Connection to the database has been established successfully.');
  } catch (e) {
    console.error('Error while connecting to the database', e);
  }
};

export default DbInitialize;
