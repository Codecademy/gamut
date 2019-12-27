import React, { useMemo } from 'react';
import cx from 'classnames';

import { ContainerElementProps, MediaSizes, GapSizes, GapTypes } from './types';
import s from './styles/Grid.scss';

type GapConfig = Record<MediaSizes, GapSizes>;

type GridProps = Record<GapTypes, GapConfig | GapSizes>;

type LayoutGridProps = GridProps & ContainerElementProps;

const computeClasses = (gaps: GridProps) => {
  return Object.keys(gaps).reduce(
    (carry: Record<string, string>, gap: 'rowGap' | 'columnGap') => {
      const gapConfig = gaps[gap];
      if (!gapConfig) {
        return carry;
      }

      let classes = {};

      if (typeof gapConfig === 'string') {
        classes = {
          ...classes,
          [s[`${gap}_smScreen__${gapConfig}`]]: gapConfig,
        };
      } else {
        classes = {
          ...classes,
          ...Object.keys(gapConfig).reduce((carry, mediaSize: MediaSizes) => {
            const gapSize = gapConfig[mediaSize];
            if (!gapSize) {
              return carry;
            }
            return {
              ...carry,
              [s[`${gap}_${mediaSize}Screen__${gapSize}`]]: gapSize,
            };
          }, {}),
        };
      }

      return {
        ...carry,
        ...classes,
      };
    },
    {} as Record<string, string>
  );
};

const Grid: React.FC<LayoutGridProps> = ({
  children,
  testId,
  className,
  rowGap,
  columnGap,
}) => {
  const gapClasses = useMemo(() => {
    return computeClasses({ rowGap, columnGap });
  }, [rowGap, columnGap]);
  const classes = cx(s.container, className, gapClasses);

  return (
    <div className={classes} data-testid={testId}>
      {children}
    </div>
  );
};

export default Grid;
