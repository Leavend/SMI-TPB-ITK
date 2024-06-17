import { autoInjectable } from 'tsyringe';
import {
  IFindMahasiswaQuery,
  IMahasiswa,
  IMahasiswaCreationBody,
} from '../interfaces/mahasiswa-interface';
import MahasiswaDataSource from '../datasources/mahasiswa-datasource';

@autoInjectable()
class MahasiswaService {
  private mahasiswaDataSource: MahasiswaDataSource;

  constructor(_mahasiswaDataSource: MahasiswaDataSource) {
    this.mahasiswaDataSource = _mahasiswaDataSource;
  }

  async getMahasiswaByField(record: Partial<IMahasiswa>): Promise<IMahasiswa | null> {
    const query = {
      where: { ...record },
      raw: true,
    } as IFindMahasiswaQuery;
    return await this.mahasiswaDataSource.fetchOne(query);
  }

  async createMahasiswa(record: IMahasiswaCreationBody): Promise<IMahasiswa> {
    return await this.mahasiswaDataSource.create(record);
  }
}

export default MahasiswaService;
