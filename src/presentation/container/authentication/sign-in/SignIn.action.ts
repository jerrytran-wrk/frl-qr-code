import {SignInStoreApi} from './SignIn.type';
import {INITIAL_STATE} from './constants';

import * as Keychain from 'react-native-keychain';
import {FirestoreAuthenticationDataSource} from '@data';

export const SignInActions = {
  reset: () => ({setState}: SignInStoreApi) => {
    setState(INITIAL_STATE);
  },
  checkCurrentSession: () => async (api: SignInStoreApi): Promise<boolean> => {
    api.setState({isValidatingCurrentSession: true});
    const data = await Keychain.getGenericPassword();
    if (data) {
      const result = await SignInActions.signIn(
        data.username,
        data.password,
      )(api);
      api.setState({isValidatingCurrentSession: false});
      return result;
    }
    api.setState({isValidatingCurrentSession: false});
    return false;
  },
  signIn: (username: string, password: string) => async ({
    setState,
  }: SignInStoreApi): Promise<boolean> => {
    setState({isSigning: true});
    const dataSource = new FirestoreAuthenticationDataSource();
    const result = await dataSource.signIn(username, password);
    const authorized = result.caseOf({left: () => false, right: (r) => r});
    if (authorized) {
      await Keychain.setGenericPassword(username, password);
    }
    setState({isSigning: false});
    return authorized;
  },
};
