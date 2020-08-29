import {Either} from 'tsmonad';
import {Exception} from '@core';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export interface RemoteAuthenticationDataSource {
  signIn(
    username: string,
    password: string,
  ): Promise<Either<Exception, boolean>>;
}

export class FirestoreAuthenticationDataSource
  implements RemoteAuthenticationDataSource {
  static readonly COLLECTION = 'Users';

  firestore: FirebaseFirestoreTypes.Module;
  constructor() {
    this.firestore = firestore();
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<Either<Exception, boolean>> {
    try {
      const document = await this.firestore
        .collection(FirestoreAuthenticationDataSource.COLLECTION)
        .doc(username)
        .get();
      return Either.right(
        document.exists && document.data()?.password === password,
      );
    } catch (error) {
      return Either.left(new Exception());
    }
  }
}
