import React from 'react';
import cx from 'classnames';

import generateClassnames from '../utils/generateClassnames';
import { ResponsiveProperty } from '../typings/responsive-properties';

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

export const ListRow: React.FC<ListRow> = React.memo(
  ({ children, align = 'start', wrap = 'nowrap' }) => (
    <div className={cx(s.listRow, generateClassnames({ wrap, align }, s))}>
      {children}
    </div>
  )
);

export default ListRow;
