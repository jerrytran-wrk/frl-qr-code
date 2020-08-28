import {Either} from 'tsmonad';
import {Exception} from '@core';
import {Distributor, PaginationResult} from '../model';

export interface DistributorDataSource {
  add(distributor: Distributor): Promise<Either<Exception, Distributor>>;

  remove(id: number): Promise<Either<Exception, boolean>>;

  edit(distributor: Distributor): Promise<Either<Exception, Distributor>>;

  list(
    index: number,
  ): Promise<Either<Exception, PaginationResult<Distributor>>>;
}
