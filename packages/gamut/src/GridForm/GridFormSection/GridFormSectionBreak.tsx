import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../../Box/Box';
import { Column } from '../../Layout/Column';

const hrProps = variance.compose(
  system.color,
  system.space,
  system.layout,
  system.border
);

export interface HrProps extends StyleProps<typeof hrProps> {}

export const LineBreak = styled('hr', styledConfig)<HrProps>(hrProps);

export const GridFormSectionBreak: React.FC = () => {
  return (
    <Column size={12}>
      <LineBreak
        borderTop="none"
        borderX="none"
        border={1}
        borderBottom="text"
        width="90%"
      />
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
