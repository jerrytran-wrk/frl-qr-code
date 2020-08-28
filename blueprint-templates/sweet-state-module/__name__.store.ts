import {createStore, createHook} from 'react-sweet-state';
import { {{$name}}Actions} from './{{$name}}.action';
import { {{$name}}State} from './{{$name}}.type';
import {INITIAL_STATE} from './constants';

export const {{$name}}Store = createStore<{{$name}}State, typeof {{$name}}Actions>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: {{$name}}Actions,
  name: '{{$name}}Store',
});

export const use{{$name}} = createHook({{$name}}Store);
