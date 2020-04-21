import React, { useContext } from 'react';
import cx from 'classnames';

import { generateResponsiveClassnames } from '../utils';
import { ResponsiveProperty } from '../typings/responsive-properties';
import { ListContext } from './ListContext';

import s from './styles/ListRow.module.scss';

type Wrap = 'wrap' | 'nowrap';
type Alignments = 'start' | 'end' | 'spaceBetween' | 'spaceAround' | 'center';

export type ListRow = {
  /** flex align */
  align?: ResponsiveProperty<Alignments>;
  /** flex justifications */
  justify?: ResponsiveProperty<Alignments>;
  /** toggles wrapping content */
  wrap?: ResponsiveProperty<Wrap>;
};

export const ListRow: React.FC<ListRow> = ({
  children,
  align = 'start',
  wrap = 'nowrap',
}) => {
  const { bordered, alternating } = useContext(ListContext);

  return (
    <div
      className={cx(
        s.listRow,
        generateResponsiveClassnames({ wrap, align }, s),
        { [s.bordered]: bordered, [s.alternating]: alternating }
      )}
    >
      {children}
    </div>
  );
};

export default ListRow;
