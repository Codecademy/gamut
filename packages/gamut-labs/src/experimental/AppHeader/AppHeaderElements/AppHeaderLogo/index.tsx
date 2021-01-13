import { Anchor } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Logo } from '../../..'; // FIX THIS IMPORT
// import { HeaderClickHandler } from '../../GlobalHeader';
import { focusStyles } from '../SharedStyles';
import { AppHeaderLogoItem } from '../types';

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

export type AppHeaderLogoProps = {
  item: AppHeaderLogoItem;
  onClick: () => {}; // is this what I should do or should I already put the type as the click handler we created specific to app header?
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
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
