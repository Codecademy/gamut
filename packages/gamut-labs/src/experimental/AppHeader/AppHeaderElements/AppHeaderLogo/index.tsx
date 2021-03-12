import { Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { Logo } from '../../../../brand/Logo';
import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

const LogoButton = styled(Anchor)`
  padding: 0.375rem 0;
`;

const StyledLogo = styled(Logo)`
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: -0.1875rem;
`;

export type AppHeaderLogoProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLogoItem;
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  action,
  item,
}) => {
  return (
    <LogoButton
      data-testid={item.dataTestId}
      onClick={(event) => action(event, item)}
      href={item.href}
    >
      <StyledLogo type={item.pro ? 'proMono' : 'default'} height={27} />
    </LogoButton>
  );
};
