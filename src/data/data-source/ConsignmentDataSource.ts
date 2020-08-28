import {Either} from 'tsmonad';
import {Exception} from '@core';
import {Consignment, PaginationResult} from '../model';

export interface ConsignmentDataSource {
  add(consignment: Consignment): Promise<Either<Exception, Consignment>>;

  remove(id: number): Promise<Either<Exception, boolean>>;

  edit(consignment: Consignment): Promise<Either<Exception, Consignment>>;

  list(
    index: number,
  ): Promise<Either<Exception, PaginationResult<Consignment>>>;
}
