import React from 'react';
import cx from 'classnames';

import { ListContext } from './ListContext';

import s from './styles/List.module.scss';

export type ListProps = {
  gap?: boolean;
  bordered?: boolean;
};

export const List: React.FC<ListProps> = React.memo(
  ({ children, gap, bordered = false }) => (
    <div
      className={cx(s.list, {
        [s.list__gap]: gap,
      })}
    >
      <ListContext.Provider value={{ bordered }}>
        {children}
      </ListContext.Provider>
    </div>
  )
);

export default List;
