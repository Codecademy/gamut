import React from 'react';

type ListContextShape = {
  bordered?: boolean;
};

export const ListContext = React.createContext<ListContextShape>({});
