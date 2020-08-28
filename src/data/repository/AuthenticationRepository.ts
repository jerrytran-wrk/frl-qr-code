import {Either} from 'tsmonad';
import {injectable, inject} from 'tsyringe';

import {RemoteException, LocalException} from '@core';
import {AuthenticationRepository} from '@domain';
import {
  LocalAuthenticationDataSource,
  RemoteAuthenticationDataSource,
} from '../data-source';

@injectable()
export class DefaultAuthenticationRepository
  implements AuthenticationRepository {
  constructor(
    @inject('LocalAuthenticationDataSource')
    private readonly localDataSource: LocalAuthenticationDataSource,
    @inject('RemoteAuthenticationDataSource')
    private readonly remoteDataSource: RemoteAuthenticationDataSource,
  ) {}
  async signIn(credential: any): Promise<Either<RemoteException, string>> {
    const result = await this.remoteDataSource.signIn({
      phoneNumber: '1',
      firebaseToken: {
        code: '1',
        key: '2',
      },
    });
    return result.map((r) => r.data.token);
  }

  async getToken(key: string): Promise<Either<LocalException, string>> {
    return this.localDataSource.getToken(key);
  }

  saveToken(
    key: string,
    token: string,
  ): Promise<Either<LocalException, boolean>> {
    return this.localDataSource.saveToken(key, token);
  }
}
