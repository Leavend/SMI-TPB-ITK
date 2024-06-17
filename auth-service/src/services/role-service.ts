import { autoInjectable } from 'tsyringe';
import { IFindRoleQuery, IRole, IRoleCreationBody } from '../interfaces/role-interface';
import RoleDataSource from '../datasources/role-datasource';

@autoInjectable()
class RoleService {
  private roleDataSource: RoleDataSource;

  constructor(_roleDataSource: RoleDataSource) {
    this.roleDataSource = _roleDataSource;
  }

  async getRoleByField(query: IFindRoleQuery): Promise<IRole | null> {
    return await this.roleDataSource.fetchOne(query);
  }

  async getRoles(query: IFindRoleQuery): Promise<IRole[]> {
    return await this.roleDataSource.findAll(query);
  }

  async createRole(record: IRoleCreationBody): Promise<IRole> {
    return await this.roleDataSource.create(record);
  }

  async deleteRole(query: IFindRoleQuery): Promise<number> {
    return await this.roleDataSource.deleteOne(query);
  }
}

export default RoleService;
