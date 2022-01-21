import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { Column } from '../../Layout/Column';
import { GridFormSectionBreakProps } from '../types';

const hrProps = variance.compose(system.border, system.color, system.layout);

export interface HrProps extends StyleProps<typeof hrProps> {}

export const SectionBreak = styled('hr')<HrProps>(hrProps);

export const GridFormSectionBreak: React.FC<GridFormSectionBreakProps> = ({
  breakType,
}) => {
  return breakType === 'none' ? null : (
    <Column size={12}>
      <SectionBreak
        borderTop="none"
        borderX="none"
        border={1}
        borderColorBottom="text"
        data-testid="form-section-break"
        width="100%"
        role="separator"
      />
    </Column>
  );
};
