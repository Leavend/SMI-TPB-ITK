import { autoInjectable } from 'tsyringe';
import {
  IFindUserRoleQuery,
  IUserRoleCreationBody,
  IUserRole,
} from '../interfaces/user-role-interface';
import UserRoleDataSource from '../datasources/user-role-datasource';

@autoInjectable()
class UserRoleService {
  private userRoleDataSource: UserRoleDataSource;

  constructor(_userRoleDataSource: UserRoleDataSource) {
    this.userRoleDataSource = _userRoleDataSource;
  }

  async assignRole(record: IUserRoleCreationBody): Promise<IUserRole> {
    return await this.userRoleDataSource.create(record);
  }

  async removeRole(query: IFindUserRoleQuery): Promise<void> {
    await this.userRoleDataSource.deleteOne(query);
  }

  async getUserRoleByField(query: IFindUserRoleQuery): Promise<IUserRole | null> {
    return await this.userRoleDataSource.fetchOne(query);
  }

  async updateUserRole(searchBy: IFindUserRoleQuery, data: Partial<IUserRole>): Promise<void> {
    await this.userRoleDataSource.updateOne(searchBy, data);
  }

  async getUserRoles(query: IFindUserRoleQuery): Promise<IUserRole[]> {
    return await this.userRoleDataSource.findAll(query);
  }

  async getRolesByUserId(userId: number): Promise<IUserRole[]> {
    return await this.userRoleDataSource.findRolesByUserId(userId);
  }
}

export default UserRoleService;
