import React from 'react';
import cx from 'classnames';

import s from './styles/SimpleGrid.scss';
import { GapSizes } from './types';

type GridProps = {
  direction?: 'row' | 'column';
  gap?: GapSizes;
  repeat?: boolean;
  ratio?: string;
};

const getRatio = (ratio: string) => {
  const parsed = ratio.split(':');
  return parsed.reduce((carry, value) => {
    return carry + `minmax(max-content, ${value}) `;
  }, '');
};

const SimpleGrid: React.FC<GridProps> = ({
  children,
  direction = 'column',
  gap = 'sm',
  ratio = '1fr',
  repeat = true,
}) => {
  const base = 'grid';
  const interval = repeat ? 'Auto' : 'Template';
  const type = direction === 'row' ? 'Rows' : 'Columns';
  const key = `${base}${interval}${type}`;

  const style = {
    [key]: getRatio(ratio),
  };
  return (
    <div
      className={cx(s.container, s.row, {
        [s[`gap_${gap}`]]: gap,
      })}
      style={style}
    >
      {children}
    </div>
  );
};

export default SimpleGrid;
