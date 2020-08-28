import { {{$name}}StoreApi} from './{{$name}}.type';
import {INITIAL_STATE} from './{{$name}}.store';

export const {{$name}}Actions = {
  reset: () => async ({setState}: {{$name}}StoreApi) => {
    setState(INITIAL_STATE);
  },
};
