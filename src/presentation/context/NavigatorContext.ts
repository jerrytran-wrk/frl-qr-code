import React from 'react';

export interface NavigatorContextState {
  setIsAuthorized: (value: boolean) => void;
}

export const DEFAULT_NAVIGATOR_CONTEXT: NavigatorContextState = {
  setIsAuthorized: () => null,
};

export const NavigatorContext = React.createContext<NavigatorContextState>(
  DEFAULT_NAVIGATOR_CONTEXT,
);
