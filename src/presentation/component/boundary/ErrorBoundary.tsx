import React from 'react';
import {StyleSheet} from 'react-native';

export interface ErrorBoundaryProps {}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }
  componentDidCatch() {
    this.setState({hasError: true});
  }
  render() {
    const {hasError} = this.state;
    if (hasError) {
      return null;
    }
    return this.props.children ?? null;
  }
}

const _styles = StyleSheet.create({
  container: {},
});
