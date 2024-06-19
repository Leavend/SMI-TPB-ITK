import {
  IFindTendikQuery,
  ITendik,
  ITendikCreationBody,
  ITendikDataSource,
} from '../interfaces/tendik-interface';
import TendikModel from '../models/tendik-model';

class TendikDataSource implements ITendikDataSource {
  async fetchOne(query: IFindTendikQuery): Promise<ITendik | null> {
    return await TendikModel.findOne(query);
  }
  async create(record: ITendikCreationBody): Promise<ITendik> {
    return await TendikModel.create(record);
  }
}

export default TendikDataSource;
