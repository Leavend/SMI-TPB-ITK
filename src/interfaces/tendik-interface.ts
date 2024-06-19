import { Model, Optional } from 'sequelize';

export interface ITendik {
  tendikId: number;
  userId: number;
  nidn: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITendikCreationBody
  extends Optional<ITendik, 'tendikId' | 'createdAt' | 'updatedAt'> {}

export interface ITendikModel extends Model<ITendik, ITendikCreationBody>, ITendik {}

export interface IFindTendikQuery {
  where: {
    [key: string]: string;
  };
  raw?: boolean;
  returning?: boolean;
}

export interface ITendikDataSource {
  fetchOne(query: IFindTendikQuery): Promise<ITendik | null>;
  create(record: ITendikCreationBody): Promise<ITendik>;
}
