import { createContext, useContext } from 'react';

import { Query } from '..';

interface ListState {
  selected?: (keyof any)[];
  expanded?: (keyof any)[];
  query?: Query<any>;
}

export const ListStateContext = createContext<ListState>({} as ListState);

export const useListState = () => {
  return useContext(ListStateContext);
};
