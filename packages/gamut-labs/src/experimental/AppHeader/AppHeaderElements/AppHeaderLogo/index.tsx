import { AppBarButton } from '@codecademy/gamut';
import React from 'react';

import { Logo } from '../../../../brand/Logo';
import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

export type AppHeaderLogoProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLogoItem;
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  action,
  item,
}) => {
  return (
    <AppBarButton
      height="3rem"
      paddingTop={0}
      paddingBottom={4}
      data-testid={item.dataTestId}
      onClick={(event) => action(event, item)}
      href={item.href}
    >
      <Logo type={item.pro ? 'proMono' : 'default'} height={27} />
    </AppBarButton>
  );
};
