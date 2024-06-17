import { Model, Optional } from 'sequelize';

export interface IMahasiswa {
  mahasiswaId: number;
  userId: number;
  nim: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMahasiswaCreationBody
  extends Optional<IMahasiswa, 'mahasiswaId' | 'createdAt' | 'updatedAt'> {}

export interface IMahasiswaModel extends Model<IMahasiswa, IMahasiswaCreationBody>, IMahasiswa {}

export interface IFindMahasiswaQuery {
  where: {
    [key: string]: string;
  };
  raw?: boolean;
  returning?: boolean;
}

export interface IMahasiswaDataSource {
  fetchOne(query: IFindMahasiswaQuery): Promise<IMahasiswa | null>;
  create(record: IMahasiswaCreationBody): Promise<IMahasiswa>;
}
