import {SignInStoreApi} from './SignIn.type';
import {INITIAL_STATE} from './constants';

import * as Keychain from 'react-native-keychain';

export const SignInActions = {
  reset: () => ({setState}: SignInStoreApi) => {
    setState(INITIAL_STATE);
  },
  signIn: (userName: string, password: string) => async ({
    setState,
  }: SignInStoreApi): Promise<boolean> => {
    setState({isSigning: true});
    if (userName === 'admin' && password === '12345') {
      await Keychain.setGenericPassword(userName, password);
      return true;
    }
    setState({isSigning: false});
    return false;
  },
};
