import {createStore, createHook} from 'react-sweet-state';
import {SignInActions} from './SignIn.action';
import {SignInState} from './SignIn.type';
import {INITIAL_STATE} from './constants';

export const SignInStore = createStore<SignInState, typeof SignInActions>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: SignInActions,
  name: 'SignInStore',
});

export const useSignIn = createHook(SignInStore);
