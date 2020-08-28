import React from 'react';
import {} from 'react-native';
// import from library section

// importing from alias section
import {ErrorBoundary} from '@components';
// importing from local file
import {use{{$name}} } from './{{$name}}.store';
import { {{$name}}Props } from './{{$name}}.type';
import { {{$name}}Styles } from './{{$name}}.style';

export const {{$name}}: React.FC<{{$name}}Props> = (props) => {
  const [state, action] = use{{$name}}();
  return (
    <ErrorBoundary>
      
    </ErrorBoundary>
  );
};
