import {
  IFindUserQuery,
  IUser,
  IUserCreationBody,
  IUserDataSource,
} from '../interfaces/user-interface';
import RoleModel from '../models/role-model';
import UserModel from '../models/user-model';
import UserRoleModel from '../models/user-role-model';

class UserDataSource implements IUserDataSource {
  async fetchOne(query: IFindUserQuery): Promise<IUser | null> {
    return await UserModel.findOne(query);
  }

  async create(record: IUserCreationBody): Promise<IUser> {
    return await UserModel.create(record);
  }

  async updateOne(searchBy: IFindUserQuery, data: Partial<IUser>): Promise<void> {
    await UserModel.update(data, searchBy);
  }

  async findAll(query: IFindUserQuery): Promise<IUser[]> {
    return await UserModel.findAll(query);
  }

  async fetchUserWithRole(userId: string): Promise<IUser | null> {
    return await UserModel.findOne({
      where: { userId },
      include: [
        {
          model: UserRoleModel,
          include: [
            {
              model: RoleModel,
              attributes: ['roleName'],
            },
          ],
        },
      ],
    });
  }
}

export default UserDataSource;
