import { autoInjectable } from 'tsyringe';
import { IFindUserQuery, IUser, IUserCreationBody } from '../interfaces/user-interface';
import UserDataSource from '../datasources/user-datasource';

@autoInjectable()
class UserService {
  private userDataSource: UserDataSource;

  constructor(_userDataSource: UserDataSource) {
    this.userDataSource = _userDataSource;
  }

  async getUserByField(record: Partial<IUser>): Promise<IUser | null> {
    const query = {
      where: { ...record },
      raw: true,
    } as IFindUserQuery;
    return await this.userDataSource.fetchOne(query);
  }

  async createUser(record: IUserCreationBody): Promise<IUser> {
    return await this.userDataSource.create(record);
  }

  async updateRecord(searchBy: Partial<IUser>, record: Partial<IUser>): Promise<void> {
    const query = {
      where: { ...searchBy },
    } as IFindUserQuery;
    return await this.userDataSource.updateOne(query, record);
  }

  async getUsers(query: IFindUserQuery): Promise<IUser[]> {
    return await this.userDataSource.findAll(query);
  }

  async getUserWithRoles(userId: string): Promise<IUser | null> {
    return await this.userDataSource.fetchUserWithRole(userId);
  }
}

export default UserService;
