import { ButtonDeprecated } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import React from 'react';
import { Logo } from '../../..';

import { AppHeaderLogo } from '../../AppHeader/types';
import styles from './styles.scss';

export type LogoButtonProps = {
  item: AppHeaderLogo;
};

export const AppHeaderLogoElement: React.FC<LogoButtonProps> = ({ item }) => {
  return (
    <ButtonDeprecated
      className={styles.logo}
      // data-testid="header-logo"
      // onClick={() => trackClick('topnav_logo')}
      flat
      href={'/'}
      theme="navy"
    >
      {
        <Logo
          type={item.pro ? 'proMono' : 'default'}
          height={27}
          color={colors.navy}
        />
      }
    </ButtonDeprecated>
  );
};
