import {
  IFindRoleQuery,
  IRoleDataSource,
  IRole,
  IRoleCreationBody,
} from '../interfaces/role-interface';
import RoleModel from '../models/role-model';

class RoleDataSource implements IRoleDataSource {
  async fetchOne(query: IFindRoleQuery): Promise<IRole | null> {
    return await RoleModel.findOne(query);
  }

  async findAll(query: IFindRoleQuery): Promise<IRole[]> {
    return await RoleModel.findAll(query);
  }

  async create(record: IRoleCreationBody): Promise<IRole> {
    return await RoleModel.create(record);
  }

  async deleteOne(query: IFindRoleQuery): Promise<number> {
    return await RoleModel.destroy(query);
  }
}

export default RoleDataSource;
