import {
  IFindMahasiswaQuery,
  IMahasiswa,
  IMahasiswaCreationBody,
  IMahasiswaDataSource,
} from '../interfaces/mahasiswa-interface';
import MahasiswaModel from '../models/mahasiswa-model';

class MahasiswaDataSource implements IMahasiswaDataSource {
  async fetchOne(query: IFindMahasiswaQuery): Promise<IMahasiswa | null> {
    return await MahasiswaModel.findOne(query);
  }

  async create(record: IMahasiswaCreationBody): Promise<IMahasiswa> {
    return await MahasiswaModel.create(record);
  }
}

export default MahasiswaDataSource;
