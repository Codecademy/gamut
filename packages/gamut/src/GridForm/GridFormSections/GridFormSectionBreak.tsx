import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { Column } from '../../Layout/Column';

const hrProps = variance.compose(system.border, system.color, system.layout);

export interface HrProps extends StyleProps<typeof hrProps> {}

export const SectionBreak = styled('hr')<HrProps>(hrProps);

export const GridFormSectionBreak: React.FC = () => {
  return (
    <Column size={12}>
      <SectionBreak
        borderTop="none"
        borderX="none"
        border={1}
        borderColorBottom="text"
        width="100%"
      />
    </Column>
  );
};
