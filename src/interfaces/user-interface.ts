import { Optional, Model } from 'sequelize';

export interface IUser {
  userId: number;
  username: string;
  full_name: string;
  email: string;
  accountStatus: string;
  password: string;
  major: string;
  study_program: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreationBody extends Optional<IUser, 'userId' | 'createdAt' | 'updatedAt'> {}

export interface IUserModel extends Model<IUser, IUserCreationBody>, IUser {}

export interface IFindUserQuery {
  where: {
    [key: string]: string;
  };
  raw?: boolean;
  returning?: boolean;
}

export interface IUserDataSource {
  fetchOne(query: IFindUserQuery): Promise<IUser | null>;
  create(record: IUserCreationBody): Promise<IUser>;
  updateOne(searchBy: IFindUserQuery, data: Partial<IUser>): Promise<void>;
  findAll(query: IFindUserQuery): Promise<IUser[]>;
}
