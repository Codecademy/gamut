import { styledConfig, system, variant } from '@codecademy/gamut-styles';
import { system } from '@codecademy/gamut-system';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../../Box/Box';
import { Column } from '../../Layout/Column';

const anchorProps = variance.compose(
  system.layout,
  system.typography,
  system.space
);

export const AnchorBase = styled('a', styledConfig)<AnchorProps>(
  anchorVariants,
  anchorProps
);

const Hello = styled.hr`
  color: 'blue';
  height: '3px';
  width: '90%';
`;

export const GridFormSectionBreak: React.FC = () => {
  return (
    <Column size={12}>
      <Box bg="red" height="3px" width="90%" />
      <Hello />
    </Column>
    // <LineBreak
    //   width="90%"
    //   height="1px"
    //   verticalAlign="middle"
    //   my={'1rem'}
    //   textColor={'text'}
    // />
  );
};
