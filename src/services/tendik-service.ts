import { autoInjectable } from 'tsyringe';
import { IFindTendikQuery, ITendik, ITendikCreationBody } from '../interfaces/tendik-interface';
import TendikDataSource from '../datasources/tendik-datasource';

@autoInjectable()
class TendikService {
  private tendikDataSource: TendikDataSource;

  constructor(_tendikDataSource: TendikDataSource) {
    this.tendikDataSource = _tendikDataSource;
  }

  async getTendikByField(record: Partial<ITendik>): Promise<ITendik | null> {
    const query = {
      where: { ...record },
      raw: true,
    } as IFindTendikQuery;
    return await this.tendikDataSource.fetchOne(query);
  }

  async createTendik(record: ITendikCreationBody): Promise<ITendik> {
    return await this.tendikDataSource.create(record);
  }
}

export default TendikService;
