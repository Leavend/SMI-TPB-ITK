import {
  IFindUserRoleQuery,
  IUserRoleDataSource,
  IUserRole,
  IUserRoleCreationBody,
} from '../interfaces/user-role-interface';
import UserRoleModel from '../models/user-role-model';

class UserRoleDataSource implements IUserRoleDataSource {
  async fetchOne(query: IFindUserRoleQuery): Promise<IUserRole | null> {
    return await UserRoleModel.findOne({ where: query.where });
  }

  async create(record: IUserRoleCreationBody): Promise<IUserRole> {
    return await UserRoleModel.create(record);
  }

  async updateOne(searchBy: IFindUserRoleQuery, data: Partial<IUserRole>): Promise<void> {
    await UserRoleModel.update(data, { where: searchBy.where });
  }

  async deleteOne(query: IFindUserRoleQuery): Promise<void> {
    await UserRoleModel.destroy({ where: query.where });
  }

  async findAll(query: IFindUserRoleQuery): Promise<IUserRole[]> {
    return await UserRoleModel.findAll({ where: query.where });
  }

  async findRolesByUserId(userId: number): Promise<IUserRole[]> {
    return await UserRoleModel.findAll({
      where: { userId },
    });
  }
}

export default UserRoleDataSource;
