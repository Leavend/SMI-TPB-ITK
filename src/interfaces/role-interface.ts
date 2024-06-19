import { Model, Optional } from 'sequelize';

export interface IRole {
  roleId: number;
  roleName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoleCreationBody extends Optional<IRole, 'roleId' | 'createdAt' | 'updatedAt'> {}

export interface IRoleModel extends Model<IRole, IRoleCreationBody>, IRole {}

export interface IFindRoleQuery {
  where: {
    roleId?: number;
    [key: string]: any;
  };
  raw?: boolean;
  returning?: boolean;
}

export interface IRoleDataSource {
  create(record: IRoleCreationBody): Promise<IRole>;
  deleteOne(query: IFindRoleQuery): Promise<number>;
  fetchOne(query: IFindRoleQuery): Promise<IRole | null>;
  findAll(query: IFindRoleQuery): Promise<IRole[]>;
}
