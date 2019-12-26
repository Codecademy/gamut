import React, { useMemo } from 'react';
import { keys, reduce, compose } from 'lodash/fp';
import cx from 'classnames';

import { ContainerElementProps } from './types';
import s from './styles/Grid.scss';

type GapSizes = 'sm' | 'md' | 'lg' | 'xl';
type MediaSizes = 'sm' | 'md' | 'lg';

type GapProps = {
  rowGap?: GapSizes;
  columnGap?: GapSizes;
};

type GridConfig = Record<string | MediaSizes, GapProps>;

type LayoutGridProps = GridConfig & ContainerElementProps;

const computeClasses = (medias: Record<string | MediaSizes, GapProps>) =>
  compose(
    reduce(
      (carry: Record<string, string>, mediaSize) => {
        const { columnGap, rowGap } = medias[mediaSize];
        const classes = {
          [s[`columnGap_${mediaSize}Screen__${columnGap}`]]: columnGap,
          [s[`rowGap_${mediaSize}Screen__${rowGap}`]]: rowGap,
        };

        return {
          ...carry,
          ...classes,
        };
      },
      {} as Record<string, string>
    ),
    keys
  )(medias);

const Grid: React.FC<LayoutGridProps> = ({
  children,
  testId,
  className,
  ...rest
}) => {
  const gapClasses = useMemo(() => {
    return computeClasses(rest);
  }, [rest]);
  const classes = cx(s.container, className, gapClasses);

  return (
    <div className={classes} data-testid={testId}>
      {children}
    </div>
  );
};

export default Grid;
