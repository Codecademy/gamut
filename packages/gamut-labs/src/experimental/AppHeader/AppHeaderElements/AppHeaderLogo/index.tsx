import { Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { Logo } from '../../../../brand/Logo';
import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

export type AppHeaderLogoProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLogoItem;
};

const StyledLogo = styled(Logo)`
  padding-top: 2px;
  padding-bottom: 2px;
`;

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  action,
  item,
}) => {
  return (
    <Anchor
      variant="interface"
      display="inline-flex"
      height="2.5rem"
      paddingY={4}
      data-testid={item.dataTestId}
      onClick={(event) => action(event, item)}
      href={item.href}
    >
      <StyledLogo type={item.pro ? 'proMono' : 'default'} height={32} />
    </Anchor>
  );
};
