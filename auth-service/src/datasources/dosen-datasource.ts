import {
  IDosen,
  IDosenCreationBody,
  IDosenDataSource,
  IFindDosenQuery,
} from '../interfaces/dosen-interface';
import DosenModel from '../models/dosen-model';

class DosenDataSource implements IDosenDataSource {
  async fetchOne(query: IFindDosenQuery): Promise<IDosen | null> {
    return await DosenModel.findOne(query);
  }
  async create(record: IDosenCreationBody): Promise<IDosen> {
    return await DosenModel.create(record);
  }
}

export default DosenDataSource;
