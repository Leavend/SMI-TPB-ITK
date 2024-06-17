import { autoInjectable } from 'tsyringe';
import { IDosen, IDosenCreationBody, IFindDosenQuery } from '../interfaces/dosen-interface';
import DosenDataSource from '../datasources/dosen-datasource';

@autoInjectable()
class DosenService {
  private dosenDataSource: DosenDataSource;

  constructor(_dosenDataSource: DosenDataSource) {
    this.dosenDataSource = _dosenDataSource;
  }

  async getDosenByField(record: Partial<IDosen>): Promise<IDosen | null> {
    const query = {
      where: { ...record },
      raw: true,
    } as IFindDosenQuery;
    return await this.dosenDataSource.fetchOne(query);
  }

  async createDosen(record: IDosenCreationBody): Promise<IDosen> {
    return await this.dosenDataSource.create(record);
  }
}

export default DosenService;
