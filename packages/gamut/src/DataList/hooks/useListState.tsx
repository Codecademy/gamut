import { createContext, useContext } from 'react';

import { Query } from '../types';

interface ListState {
  query?: Query<any>;
}

export const ListStateContext = createContext<ListState>({} as ListState);

export const useListState = () => {
  return useContext(ListStateContext);
};
