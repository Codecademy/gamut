import { Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { Logo } from '../../../../brand/Logo';
import { focusStyles } from '../SharedStyles';
import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

const LogoButton = styled(Anchor)`
  display: inline-block;
  padding: 0.375rem 0;
  ${focusStyles}
`;

const StyledLogo = styled(Logo)`
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: -0.1875rem;
`;

export type AppHeaderLogoProps = {
  item: AppHeaderLogoItem;
  onClick: AppHeaderClickHandler;
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  item,
  onClick,
}) => {
  return (
    <LogoButton
      data-testid={item.dataTestId}
      onClick={(event) => onClick(event, item)}
      href={item.href}
    >
      {<StyledLogo type={item.pro ? 'proMono' : 'default'} height={27} />}
    </LogoButton>
  );
};
