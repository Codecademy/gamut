import { Box } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import cx from 'classnames';
import React from 'react';
import { useWindowScroll } from 'react-use';

import { GlobalHeaderProps } from '..';
import { BasicGlobalHeader } from '../BasicGlobalHeader';
import styles from './styles.module.scss';

export const AnimatedGlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const { y } = useWindowScroll();

  const isInHeaderRegion = y === 0;

  const theme = useTheme();

  return (
    <Box height={theme.elements.headerHeight}>
      <BasicGlobalHeader
        className={cx(
          styles.stickyHeader,
          isInHeaderRegion && [styles.transitionFadeOut, styles.transitionSlow],
          !isInHeaderRegion && styles.transitionFast
        )}
        {...props}
      />
    </Box>
  );
};
