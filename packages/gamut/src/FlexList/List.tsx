import React from 'react';
import cx from 'classnames';

import s from './styles/List.module.scss';

export type ListProps = {
  gap?: boolean;
  boredered?: boolean;
};

export const List: React.FC<ListProps> = React.memo(
  ({ children, gap, boredered = false }) => (
    <div
      className={cx(s.list, {
        [s.list__gap]: gap,
        [s.list__bordered]: boredered,
      })}
    >
      {children}
    </div>
  )
);

export default List;
