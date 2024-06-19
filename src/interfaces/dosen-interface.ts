import { Model, Optional } from 'sequelize';

export interface IDosen {
  dosenId: number;
  userId: number;
  nip: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDosenCreationBody
  extends Optional<IDosen, 'dosenId' | 'createdAt' | 'updatedAt'> {}

export interface IDosenModel extends Model<IDosen, IDosenCreationBody>, IDosen {}

export interface IFindDosenQuery {
  where: {
    [key: string]: string;
  };
  raw?: boolean;
  returning?: boolean;
}

export interface IDosenDataSource {
  fetchOne(query: IFindDosenQuery): Promise<IDosen | null>;
  create(record: IDosenCreationBody): Promise<IDosen>;
}
