import { Anchor } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Logo } from '../../..';
import { focusStyles } from '../../AppHeader/styles';
import { AppHeaderLogo } from '../../AppHeader/types';
import { HeaderClickHandler } from '../../GlobalHeader';

const LogoButton = styled(Anchor)`
  display: inline-block;
  margin-left: 0;
  padding: 0.375rem 0;
  ${focusStyles}
`;

const StyledLogo = styled(Logo)`
  color: ${colors.navy};
  margin-bottom: -0.1875rem;
`;

export type LogoButtonProps = {
  item: AppHeaderLogo;
  onClick: HeaderClickHandler;
};

export const AppHeaderLogoElement: React.FC<LogoButtonProps> = ({
  item,
  onClick,
}) => {
  return (
    <LogoButton
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => onClick(event, item)}
      href={item.href}
    >
      {
        <StyledLogo
          type={item.pro ? 'proMono' : 'default'}
          height={27}
          color={colors.navy}
        />
      }
    </LogoButton>
  );
};
