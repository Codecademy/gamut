import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Logo } from '../../..';
import { focusStyles } from '../../AppHeader/styles';
import { AppHeaderLogo } from '../../AppHeader/types';

const LogoButton = styled.a`
  display: inline-block;
  margin-left: 0;
  padding: 0.375rem 0;

  > svg {
    color: ${colors.navy};
    margin-bottom: -0.1875rem;
  }

  ${focusStyles}
`;

export type LogoButtonProps = {
  item: AppHeaderLogo;
  onClick: (event: React.MouseEvent, trackingTarget: string) => void;
};

export const AppHeaderLogoElement: React.FC<LogoButtonProps> = ({
  item,
  onClick,
}) => {
  return (
    <LogoButton
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
    </LogoButton>
  );
};
