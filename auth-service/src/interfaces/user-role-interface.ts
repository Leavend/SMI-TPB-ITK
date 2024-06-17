import { Model, Optional } from 'sequelize';

export interface IUserRole {
  userRoleId: number;
  roleId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRoleCreationBody
  extends Optional<IUserRole, 'roleId' | 'createdAt' | 'updatedAt'> {}

export interface IUserRoleModel extends Model<IUserRole, IUserRoleCreationBody>, IUserRole {}

export interface IFindUserRoleQuery {
  where: {
    userId?: number;
    roleId?: number;
    [key: number]: number | undefined;
  };
  raw?: boolean;
  returning?: boolean;
}

export interface IUserRoleDataSource {
  fetchOne(query: IFindUserRoleQuery): Promise<IUserRole | null>;
  create(record: IUserRoleCreationBody): Promise<IUserRole>;
  updateOne(searchBy: IFindUserRoleQuery, data: Partial<IUserRole>): Promise<void>;
  deleteOne(query: IFindUserRoleQuery): Promise<void>;
  findAll(query: IFindUserRoleQuery): Promise<IUserRole[]>;
  findRolesByUserId(userId: number): Promise<IUserRole[]>;
}
