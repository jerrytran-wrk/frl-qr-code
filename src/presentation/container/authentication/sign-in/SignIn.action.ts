import {SignInStoreApi} from './SignIn.type';
import {INITIAL_STATE} from './SignIn.store';

export const SignInActions = {
  reset: () => async ({setState}: SignInStoreApi) => {
    setState(INITIAL_STATE);
  },
};
