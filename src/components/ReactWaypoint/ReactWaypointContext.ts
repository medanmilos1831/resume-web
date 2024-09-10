import { createContext } from 'react';
import { IReactWaypointContext } from './types';

export const ReactWaypointContext = createContext<
  IReactWaypointContext | undefined
>(undefined);
