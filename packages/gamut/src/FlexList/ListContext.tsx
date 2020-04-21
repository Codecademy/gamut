import React from 'react';

type ListContextShape = {
  bordered?: boolean;
  alternating?: boolean;
};

export const ListContext = React.createContext<ListContextShape>({});
