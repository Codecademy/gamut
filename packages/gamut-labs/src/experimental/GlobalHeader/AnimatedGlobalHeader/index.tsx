import { Box } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import { GlobalHeaderProps } from '..';
import { BasicGlobalHeader } from '../BasicGlobalHeader';
import styles from './styles.module.scss';

export const AnimatedGlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const [isInHeaderRegion, setIsInHeaderRegion] = useState(true);

  const handleScrolling = useCallback(() => {
    const currentScrollPosition =
      typeof window === 'undefined' ? 0 : window?.pageYOffset;

    currentScrollPosition === 0
      ? setIsInHeaderRegion(true)
      : setIsInHeaderRegion(false);
  }, []);

  useEffect(() => {
    window?.addEventListener('scroll', handleScrolling, {
      passive: true,
    });

    // returned function will be called on component unmount
    return () => {
      window?.removeEventListener('scroll', handleScrolling);
    };
  }, [handleScrolling]);

  return (
    <Box height={theme.elements.headerHeight}>
      <BasicGlobalHeader
        className={cx(
          styles.stickyHeader,
          isInHeaderRegion && styles.transitionFadeOut
        )}
        {...props}
      />
    </Box>
  );
};
