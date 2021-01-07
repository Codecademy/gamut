import { colors } from '@codecademy/gamut-styles';
import React from 'react';

import { Logo } from '../../..';
import { AppHeaderLogo } from '../../AppHeader/types';
import styles from './styles.scss';

export type LogoButtonProps = {
  item: AppHeaderLogo;
  onClick: (event: React.MouseEvent, trackingTarget: string) => void;
};

export const AppHeaderLogoElement: React.FC<LogoButtonProps> = ({
  item,
  onClick,
}) => {
  return (
    <a
      className={styles.logo}
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => onClick(event, item.trackingTarget)}
      href={'/'}
    >
      {
        <Logo
          type={item.pro ? 'proMono' : 'default'}
          height={27}
          color={colors.navy}
        />
      }
    </a>
  );
};
