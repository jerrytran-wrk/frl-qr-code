import {Either} from 'tsmonad';
import {Exception} from '../error';

export interface UseCase<Data = any, Params = any> {
  call(param?: Params): Promise<Either<Exception, Data>>;
}
